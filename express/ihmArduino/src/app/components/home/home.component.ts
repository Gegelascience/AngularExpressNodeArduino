import { Component, OnInit } from '@angular/core';
import { ArduinoOnOffService } from '../../services/arduino-on-off.service';
import { ArduinoTemperatureService } from 'src/app/services/arduino-temperature.service';
import { ArduinoNeoPixelsService } from 'src/app/services/arduino-neo-pixels.service';
import { UltrasonService } from 'src/app/services/ultrason.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  temperature = '';
  waitTemp = false;
  distance = '';
  waitDist = false;

  constructor(private arduinoOnOff: ArduinoOnOffService,
    private temperatureService: ArduinoTemperatureService,
    private neoPixels: ArduinoNeoPixelsService,
    private ultrason: UltrasonService) { }

  ngOnInit() {

  }

  updateTemperature() {
    this.waitTemp = true;
    this.temperatureService.getTemperature().subscribe(data => {
      this.temperature = data.temperature + '°C';
      this.waitTemp = false;
    });
  }

  updateDistance() {
    this.waitDist = true;
    this.ultrason.getDistance().subscribe(data => {
      this.distance = data.distance + ' mm';
      this.waitDist = false;
    });
  }

  switchOnLight() {
    this.arduinoOnOff.updateLight('on').subscribe(data => {
      console.log(data.light);
    });
  }

  switchOffLight() {
    this.arduinoOnOff.updateLight('off').subscribe(data => {
      console.log(data.light);
    });
  }

  setRed() {
    this.neoPixels.setColor('red').subscribe(data => {
      console.log(data.color);
    });
  }

  setGreen() {
    this.neoPixels.setColor('green').subscribe(data => {
      console.log(data.color);
    });
  }

  setBlue() {
    this.neoPixels.setColor('blue').subscribe(data => {
      console.log(data.color);
    });
  }

  setWhite() {
    this.neoPixels.setColor('white').subscribe(data => {
      console.log(data.color);
    });
  }

}
