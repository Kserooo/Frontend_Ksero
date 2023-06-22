import { Injectable } from '@angular/core';

export type BaseG4Image = string | ArrayBuffer | null;
/**
 * @author: @Miguel445Ar
 * @description: This service converts an html5 image input and converts it to a base 64 format;
 */
@Injectable({
  providedIn: 'root'
})
export class ImageConverterService {


  public imageBaseG4: BaseG4Image;

  constructor() { 
    this.imageBaseG4 = null;
  }
  public processImage(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event: ProgressEvent<FileReader>) => {
      this.imageBaseG4 = reader.result as BaseG4Image;
      console.log(reader.result);
    }
  }
}
