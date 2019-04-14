import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ArduinoOnOffService } from './services/arduino-on-off.service';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { ArduinoTemperatureService } from './services/arduino-temperature.service';
import { ArduinoNeoPixelsService } from './services/arduino-neo-pixels.service';
import { UltrasonService } from './services/ultrason.service';
import { SensorsComponent } from './components/sensors/sensors.component';
import { LedArduinoComponent } from './components/led-arduino/led-arduino.component';
import { NeopixelsComponent } from './components/neopixels/neopixels.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    SensorsComponent,
    LedArduinoComponent,
    NeopixelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ArduinoOnOffService, ArduinoTemperatureService, ArduinoNeoPixelsService, UltrasonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
