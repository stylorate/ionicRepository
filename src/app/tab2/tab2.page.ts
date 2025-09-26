import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor(private alertController: AlertController) {}

  async mostrarMensaje() {
    const alert = await this.alertController.create({
      header: '¡Hola!',
      message: 'Mensaje desde app Hibrida',
      buttons: ['OK']
    });
    await alert.present();
  }
}
