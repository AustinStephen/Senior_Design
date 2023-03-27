import { Injectable } from '@angular/core';
import 'blob-polyfill/Blob.js';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  getImageData(event: ImageCroppedEvent): Promise<tf.Tensor3D> {
    return new Promise<tf.Tensor3D>((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = event.width;
      canvas.height = event.height;

      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Failed to load context'));
        return;
      }
      let image = new Image();
      let imageSrcString: string | null | undefined = event.base64;
      if (!imageSrcString) {
        reject(new Error('Failed to load the Image Source String'));
        return;
      }
      image.src = imageSrcString;
      image.onload = () => {
        context.drawImage(image, 0, 0);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        // create 3D array for RGB values
        const rgbArray: number[][][] = [];

        // loop through pixels
        for (let i = 0; i < imageData.data.length; i += 4) {
          // get RGB values
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];

          // add to 3D array
          if (!rgbArray[Math.floor(i / 4)]) {
            rgbArray[Math.floor(i / 4)] = [];
          }
          rgbArray[Math.floor(i / 4)].push([r, g, b]);
        }

        resolve(tf.tensor3d(rgbArray));
      };

      image.onerror = () => {
        reject(new Error('Failed to laod Image'));
      };
    });
  }
}
