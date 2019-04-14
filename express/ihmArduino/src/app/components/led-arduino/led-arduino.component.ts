import { Component, OnInit } from '@angular/core';
import { ArduinoOnOffService } from '../../services/arduino-on-off.service';

@Component({
  selector: 'app-led-arduino',
  templateUrl: './led-arduino.component.html',
  styleUrls: ['./led-arduino.component.css']
})
export class LedArduinoComponent implements OnInit {

  constructor(private arduinoOnOff: ArduinoOnOffService) { }

  ngOnInit() {
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
