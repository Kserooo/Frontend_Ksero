import { Injectable } from '@angular/core';

export type BaseG4Image = string | ArrayBuffer | any | null;
/**
 * @author: @Miguel445Ar
 * @description: This service converts an html5 image input and converts it
 * to a base 64 format and other formats in future versions.
 */
@Injectable({
  providedIn: 'root'
})
export class ImageConverterService {

  public imageBaseG4: BaseG4Image;

  constructor() {
    this.imageBaseG4 = null;
  }
  public convertToBase64(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event: ProgressEvent<FileReader>) => {
      this.imageBaseG4 = reader.result as BaseG4Image;
      console.log(reader.result);
    }
  }

  public fileToBase64(imageInput: any): Promise<BaseG4Image> {
    const file: File = imageInput.files[0];
    return new Promise<BaseG4Image>((resolve, reject) => {
      const reader: FileReader = new FileReader();

      // Set events
      // Event when loaded is end.
      reader.onloadend = (event: ProgressEvent<FileReader>) => {
        const base64Data: string = reader.result as string;
        resolve(base64Data);
      };


      // Event when an error has occurred.
      reader.onerror = (event: ProgressEvent<FileReader>) => {
        reject(new Error("Failed to read the file."));
      }

      // Run something to init the events.
      reader.readAsDataURL(file);
    });
  }
}
