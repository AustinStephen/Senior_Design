import { Injectable } from '@angular/core';
import 'blob-polyfill/Blob.js';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  async getImageData(file: File): Promise<ImageData> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const blob = new Blob([file], { type: file.type });
      image.src = URL.createObjectURL(blob);
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(image, 0, 0, 128, 128);
          const imageData = context.getImageData(0, 0, 128, 128);
          resolve(imageData);
        } else {
          reject('No context avaiable for this image');
        }
      };
      image.onerror = (error) => {
        reject(error);
      };
    });
  }
}
