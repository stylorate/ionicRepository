import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo, CameraPhoto } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Foto } from '../models/foto';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  public fotos: Foto[] = [];
  private PHOTO_STORAGE: string = "fotos";

  constructor() { }

  public async addNewToGallery() {

    const fotoCapturada = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })

    /*this.fotos.unshift({
      filePath: "foto_",
      webViewPath: fotoCapturada.webPath!
    });*/

    const savedImageFile = await this.savePhoto(fotoCapturada);

    this.fotos.unshift(savedImageFile);

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.fotos)
    })
  }

  public async savePhoto(cameraPhoto: CameraPhoto) {

    const base64Data = await this.readAsBase64(cameraPhoto);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    })

    return {
      filePath: fileName,
      webViewPath: cameraPhoto.webPath!
    }
  }

  public async readAsBase64(cameraPhoto: CameraPhoto) {
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();

    return await this.converterBlobToBase64(blob) as string;
  }

  converterBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob);
  });

  public async loadSave() {
    const listFotos = await Preferences.get({
      key: this.PHOTO_STORAGE
    });

    this.fotos = JSON.parse(listFotos.value!) || [];

    for (let foto of this.fotos) {
      
      const readFile = await Filesystem.readFile({
        path: foto.filePath,
        directory: Directory.Data
      })

      foto.webViewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
  }
}
