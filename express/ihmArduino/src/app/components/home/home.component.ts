import { Component, OnInit } from '@angular/core';
import { ArduinoOnOffService } from '../../services/arduino-on-off.service';
import { ArduinoTemperatureService } from 'src/app/services/arduino-temperature.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  temperature = '';
  waitTemp = false;

  constructor(private arduinoOnOff: ArduinoOnOffService, private temperatureService: ArduinoTemperatureService) { }

  ngOnInit() {

  }

  updateTemperature() {
    this.waitTemp = true;
    this.temperatureService.getTemperature().subscribe(data => {
      this.temperature = data.temperature + '°C';
      this.waitTemp = false;
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

}
