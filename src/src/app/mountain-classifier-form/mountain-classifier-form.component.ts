import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { ImageService } from './image-service.service';

@Component({
  selector: 'app-mountain-classifier-form',
  templateUrl: './mountain-classifier-form.component.html',
  styleUrls: ['./mountain-classifier-form.component.scss'],
})
export class MountainClassifierFormComponent implements OnInit {
  private map: L.Map | null;
  private marker: L.Marker | null;
  public imageUrl: string = '';
  panelOpenState = true;

  // Image Variables
  selectedFile: File | null;
  imageChangedEvent: any = '';
  transform: ImageTransform = {};
  rgbaArray: Array<Array<number>> | null;

  @ViewChild('image') imageElement: ElementRef | undefined;
  @ViewChild('cropArea') cropAreaElement: ElementRef | undefined;

  constructor(private http: HttpClient, private imageService: ImageService) {
    this.map = null;
    this.marker = null;
    this.selectedFile = null;
    this.rgbaArray = null;
    // this.imageData = null;
    // this.resizedImageData = null;
  }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [41.311, -105.588], // Latitude and Longitude of Laramie
      zoom: 13,
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
    });
  }

  collectCoordinates() {
    const latLng = this.marker ? this.marker.getLatLng() : null;
    if (latLng) {
      const latitude = latLng.lat;
      const longitude = latLng.lng;
      this.http
        .get(
          `https://nationalmap.gov/epqs/pqs.php?x=${longitude}&y=${latitude}&units=FEET&output=json`
        )
        .subscribe((result: any) => {
          const elevation =
            result.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation;
          // return elevation;

          console.log(
            `Latitude: ${latitude}, Longitude: ${longitude}, Elevation: ${elevation}`
          );
        });
    }
  }

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

    //Set the image changed event
    this.imageChangedEvent = event;
  }

  async onImageCropped(event: ImageCroppedEvent) {
    this.rgbaArray = await this.imageService.getImageData(event);
    console.log(this.rgbaArray);
  }
}
