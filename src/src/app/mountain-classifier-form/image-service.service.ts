import { Injectable } from '@angular/core';
import 'blob-polyfill/Blob.js';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  getImageData(event: ImageCroppedEvent): Promise<Array<Array<number>>> {
    return new Promise<Array<Array<number>>>((resolve, reject) => {
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
      let formattedRBGA_Array: Array<Array<number>> = [[]];
      image.onload = () => {
        context.drawImage(image, 0, 0);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const RGBA_Array: Uint8ClampedArray = imageData.data;

        for (var i = 0; i < RGBA_Array.length / 4; i++) {
          let thisPixel: Array<number> = [];
          for (var j = 0; j < 4; j++) {
            const iterator = i * 4 + j;
            thisPixel[j] = RGBA_Array[iterator];
          }
          formattedRBGA_Array[i] = thisPixel;
        }

        resolve(formattedRBGA_Array);
      };

      image.onerror = () => {
        reject(new Error('Failed to laod Image'));
      };
    });
  }
}
