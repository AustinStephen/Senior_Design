import { Component, OnInit } from '@angular/core';
import { Mountain } from '../interfaces/interfaces';
import { ClassifiableMountains } from '../interfaces/mountains';

@Component({
  selector: 'app-mountain-gallery',
  templateUrl: './mountain-gallery.component.html',
  styleUrls: ['./mountain-gallery.component.scss'],
})
export class MountainGalleryComponent implements OnInit {
  public mountainArray: Array<Mountain> = ClassifiableMountains;
  public numWidth = 3;

  constructor() {}

  ngOnInit(): void {}
}
