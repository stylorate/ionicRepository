import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SensorPage implements OnInit {

  aceleracion: DeviceMotionAccelerationData | undefined;

  constructor(private deviceMotion: DeviceMotion) { }

  ngOnInit() {
    this.startAccelerometer();
  }

  startAccelerometer() {
    this.deviceMotion.watchAcceleration({ frequency: 1000 }).subscribe(
      (acceleration: DeviceMotionAccelerationData) => {
        this.aceleracion = acceleration;
        console.log('Datos acelerómetro: ', acceleration);
      }
    );
  }
}
