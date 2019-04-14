import { Component, OnInit } from '@angular/core';
import { ArduinoTemperatureService } from 'src/app/services/arduino-temperature.service';
import { UltrasonService } from 'src/app/services/ultrason.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {

  temperature = '';
  waitTemp = false;
  distance = '';
  waitDist = false;

  constructor(private temperatureService: ArduinoTemperatureService, private ultrason: UltrasonService) { }

  ngOnInit() {
    this.updateTemperature();
    this.updateDistance();
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

}
