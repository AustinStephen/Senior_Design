import { Component, OnInit, Input } from '@angular/core';
import { Mountain } from '../interfaces/interfaces';

@Component({
  selector: 'app-mountain-card',
  templateUrl: './mountain-card.component.html',
  styleUrls: ['./mountain-card.component.scss'],
})
export class MountainCardComponent implements OnInit {
  @Input() mountain: Mountain = {
    Name: '',
    PhotoSource: '',
    Location: '',
    Elevation: '',
    Coordinates: {
      Latitude: 0,
      Longitude: 0,
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
