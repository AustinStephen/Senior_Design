import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { TensorService } from './tensor.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as tf from '@tensorflow/tfjs';
import { Coordinate } from '../interfaces/interfaces';
import { PostProcessingFormulasService } from './post-processing-formulas.service';
import { ClassifiableMountains } from '../interfaces/mountains';
import { MatDialog } from '@angular/material/dialog';
import { MountainClassifierModalComponent } from '../mountain-classifier-modal/mountain-classifier-modal.component';

@Component({
  selector: 'app-mountain-classifier-form',
  templateUrl: './mountain-classifier-form.component.html',
  styleUrls: ['./mountain-classifier-form.component.scss'],
})
export class MountainClassifierFormComponent implements OnInit {
  // Map and HTML variables
  private map: L.Map | null;
  private marker: L.Marker | null;
  panelOpenState = true;

  // Image Variables
  selectedFile: File | null;
  imageChangedEvent: any = '';
  transform: ImageTransform = {};
  rgbTensor: tf.Tensor4D | null;
  public imageUrl: string = '';

  // Mode Variables
  model: tf.LayersModel | null;
  geoLocation: Coordinate | null;
  predictionArray: Uint8Array | Float32Array | Int32Array | null;

  // Form variables
  mountainClassifierForm: FormGroup;
  imageUploaded: boolean = false;

  @ViewChild('image') imageElement: ElementRef | undefined;
  @ViewChild('cropArea') cropAreaElement: ElementRef | undefined;

  constructor(
    private imageService: TensorService,
    private fb: FormBuilder,
    private ppf: PostProcessingFormulasService,
    private dialog: MatDialog
  ) {
    this.map = null;
    this.marker = null;
    this.selectedFile = null;
    this.rgbTensor = null;
    this.model = null;
    this.geoLocation = null;
    this.model = null;
    this.predictionArray = null;
    this.mountainClassifierForm = this.fb.group({
      photo: [null, Validators.required],
      location: [null, Validators.required],
      predictionArray: [null, Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    this.initMap();
    // const modelUrl = '/assets/model-data/model.json';
    // this.model = await tf.loadLayersModel(tf.io.http(modelUrl));
    // this.model = await tf.loadLayersModel('/assets/model-data/model.json');
    this.model = await tf.loadLayersModel('file::///assets/model-data/model.json');
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [41.311, -105.588], // Latitude and Longitude of Laramie
      zoom: 7,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });

    if (this.map) {
      var control = L.control
        .layers(undefined, undefined, {
          collapsed: false,
        })
        .addTo(this.map);

      var HikingTrails = L.tileLayer(
        'https://tile.waymarkedtrails.org/{id}/{z}/{x}/{y}.png',
        {
          id: 'hiking',
          attribution:
            '&copy; <a href="http://waymarkedtrails.org">Sarah Hoffmann</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        }
      );
      var CyclingTrails = L.tileLayer(
        'https://tile.waymarkedtrails.org/{id}/{z}/{x}/{y}.png',
        {
          id: 'cycling',
          attribution:
            '&copy; <a href="http://waymarkedtrails.org">Sarah Hoffmann</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        }
      );

      control.addOverlay(HikingTrails, 'Hiking Routes');
      control.addOverlay(CyclingTrails, 'Cycling Routes');
    }

    this.marker = L.marker([41.311031, -105.593613]).addTo(this.map);

    this.map.on('click', (event) => {
      if (this.marker) this.marker.setLatLng(event.latlng);
      const latLng = this.marker ? this.marker.getLatLng() : null;
      if (latLng) {
        this.geoLocation = {
          Latitude: latLng.lat,
          Longitude: latLng.lng,
        };

        this.mountainClassifierForm.patchValue({
          location: this.geoLocation,
        });
      }
    });
  }

  // Image Cropper Functions
  onFileSelected(event: Event) {
    // Get the input element and collect the files that are associated with it
    const inputElement = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = inputElement.files;
    if (!fileList?.length) {
      console.log('No file seleeted');
      return;
    }

    // Construct a FileArray Object and set our selected file instance
    const fileArray: Array<File> = Array.from(fileList);
    this.selectedFile = fileArray[0];

    // Set the image changed event
    this.imageChangedEvent = event;
    this.imageUploaded = true;
    this.mountainClassifierForm.patchValue({ photo: this.selectedFile });
  }

  async onImageCropped(event: ImageCroppedEvent) {
    this.rgbTensor = await this.imageService.construct4DTensorFromImage(event);
    const output = this.model?.predict(this.rgbTensor);
    if (output) {
      let outputTensor: tf.Tensor<tf.Rank>;
      if (Array.isArray(output)) {
        outputTensor = output[0]; // If the output is an array of tensors, use the first tensor
      } else {
        outputTensor = output; // If the output is a single tensor, use it directly
      }
      if (outputTensor) {
        this.predictionArray = await outputTensor.data();
        this.mountainClassifierForm.patchValue({
          predictionArray: this.predictionArray,
        });
      }
    }
  }

  // Post-processing Functions
  async processPhoto(): Promise<void> {
    const photoControl = this.mountainClassifierForm.get('photo');
    const locationControl = this.mountainClassifierForm.get('location');
    const predictionArrayControl =
      this.mountainClassifierForm.get('predictionArray');

    if (!photoControl?.value && !locationControl?.value) {
      alert(
        'Please upload a photo to process and select a location on the map.'
      );
      return;
    } else if (!photoControl?.value) {
      alert('Please upload a photo to process.');
      return;
    } else if (!locationControl?.value || !this.geoLocation) {
      alert('Please select a location on the map.');
      return;
    }

    if (!predictionArrayControl?.value || !this.predictionArray) {
      console.log('Error: No prediction array is avaliable');
      return;
    }

    const parametricValues = this.ppf.sigmoidEvaluationOfAllMountains(
      this.geoLocation
    );
    // console.log('Prediction array:' + this.predictionArray);
    // console.log('Parametric Values: ' + parametricValues);
    const mostLikelyMountainIndex = this.ppf.applySigmoidEvaluations(
      this.predictionArray,
      parametricValues
    );

    await this.OpenModal(mostLikelyMountainIndex);
  }

  async OpenModal(index: number): Promise<void> {
    const dialogRef = this.dialog.open(MountainClassifierModalComponent, {
      data: ClassifiableMountains[index],
    });
  }
}
