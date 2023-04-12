import { Injectable } from '@angular/core';
import 'blob-polyfill/Blob.js';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root',
})
export class TensorService {
  constructor() {}

  async construct4DTensorFromImage(
    event: ImageCroppedEvent
  ): Promise<tf.Tensor4D> {
    const resizeWidth = 250;
    const resizeHeight = 128;
    const channels = 3;

    return new Promise<tf.Tensor4D>((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = resizeWidth;
      canvas.height = resizeHeight;

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
      image.onload = async () => {
        context.drawImage(image, 0, 0, resizeWidth, resizeHeight);
        const imageData = context.getImageData(
          0,
          0,
          resizeWidth,
          resizeHeight
        ).data;

        const inputImageArray = [];
        for (let i = 0; i < imageData.length; i += 4) {
          inputImageArray.push(imageData[i]); // Red
          inputImageArray.push(imageData[i + 1]); // Green
          inputImageArray.push(imageData[i + 2]); // Blue
        }
        const inputTensor = tf.tensor4d(inputImageArray, [
          1,
          resizeHeight,
          resizeWidth,
          channels,
        ]);

        resolve(inputTensor);
      };

      image.onerror = () => {
        reject(new Error('Failed to laod Image'));
      };
    });
  }
}
