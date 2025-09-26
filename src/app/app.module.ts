import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { DeviceMotion } from '@awesome-cordova-plugins/device-motion/ngx';
import { SensorPage } from './sensor/sensor.page';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), SensorPage],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  provideHttpClient(),
    DeviceMotion
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
