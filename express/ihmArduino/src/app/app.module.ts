import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ArduinoOnOffService } from './services/arduino-on-off.service';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { ArduinoTemperatureService } from './services/arduino-temperature.service';
import { ArduinoNeoPixelsService } from './services/arduino-neo-pixels.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ArduinoOnOffService, ArduinoTemperatureService, ArduinoNeoPixelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
