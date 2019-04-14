import { Component, OnInit } from '@angular/core';
import { ArduinoOnOffService } from '../../services/arduino-on-off.service';
import { ArduinoNeoPixelsService } from 'src/app/services/arduino-neo-pixels.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(private neoPixels: ArduinoNeoPixelsService) { }

  ngOnInit() {

  }

  setRed() {
    this.neoPixels.setColor(255, 0, 0).subscribe(data => {
      console.log(data.color);
    });
  }

  setGreen() {
    this.neoPixels.setColor(0, 255, 0).subscribe(data => {
      console.log(data.color);
    });
  }

  setBlue() {
    this.neoPixels.setColor(0, 0, 255).subscribe(data => {
      console.log(data.color);
    });
  }

  setWhite() {
    this.neoPixels.setColor(255, 255, 255).subscribe(data => {
      console.log(data.color);
    });
  }
  clearNeopixels() {
    this.neoPixels.clear().subscribe(data => {
      console.log(data.color);
    });
  }

}
