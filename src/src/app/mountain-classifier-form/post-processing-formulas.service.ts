import { Injectable } from '@angular/core';
import { Coordinate, Mountain } from '../interfaces/interfaces';
import { ClassifiableMountains } from '../interfaces/mountains';

@Injectable({
  providedIn: 'root',
})
export class PostProcessingFormulasService {
  constructor() {}

  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  calculateLatLongDistance(coord1: Coordinate, coord2: Coordinate): number {
    const EARTH_RADIUS = 3958.8; // Earth's radius in miles (mean radius)

    // Convert latitudes and longitudes from degrees to radians
    const lat1 = this.toRadians(coord1.Latitude);
    const lon1 = this.toRadians(coord1.Longitude);
    const lat2 = this.toRadians(coord2.Latitude);
    const lon2 = this.toRadians(coord2.Longitude);

    // Calculate differences in latitude and longitude
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    // Haversine formula
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate distance in miles
    const distance = EARTH_RADIUS * c;
    return distance;
  }

  sigmoidFunction(locOfMountain: Coordinate, locOfPhoto: Coordinate): number {
    return (
      1.0 /
      (0.84 +
        Math.pow(
          1.05,
          this.calculateLatLongDistance(locOfMountain, locOfPhoto) - 40
        ))
    );
  }

  sigmoidEvaluationOfAllMountains(photoLocation: Coordinate): Array<number> {
    const sigmoidElavs: Array<number> = [];
    for (var i = 0; i < ClassifiableMountains.length; i++) {
      sigmoidElavs[i] = this.sigmoidFunction(
        ClassifiableMountains[i].Coordinates,
        photoLocation
      );
    }
    return sigmoidElavs;
  }

  applySigmoidEvaluations(
    predictionArray: Uint8Array | Float32Array | Int32Array,
    sigmoidEvals: Array<number>
  ): number {
    const newPredicitionArray: Array<number> = [];
    for (var i = 0; i < predictionArray.length; i++) {
      newPredicitionArray[i] = predictionArray[i] + (sigmoidEvals[i] ?? 0);
    }
    // Return the index for the mountain we most likely believe it is
    // console.log('This is the multipled array: ' + newPredicitionArray);
    return newPredicitionArray.reduce(
      (maxIndex, currentValue, currentIndex, array) => {
        return currentValue > array[maxIndex] ? currentIndex : maxIndex;
      },
      0
    );
  }
}
