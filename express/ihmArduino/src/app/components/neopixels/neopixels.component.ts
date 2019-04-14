import { Component, OnInit } from '@angular/core';
import { ArduinoNeoPixelsService } from 'src/app/services/arduino-neo-pixels.service';

@Component({
  selector: 'app-neopixels',
  templateUrl: './neopixels.component.html',
  styleUrls: ['./neopixels.component.css']
})
export class NeopixelsComponent implements OnInit {

  model: any = {};

  constructor(private neoPixels: ArduinoNeoPixelsService) { }

  ngOnInit() {
  }

  clearNeopixels() {
    this.neoPixels.clear().subscribe(data => {
      console.log(data.color);
    });
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  setRGB(r, g, b) {
    this.neoPixels.setColor(r, g, b).subscribe(data => {
      console.log(data.color);
    });
  }

  onSubmit() {
    this.setRGB(this.hexToRgb(this.model.color).r, this.hexToRgb(this.model.color).g, this.hexToRgb(this.model.color).b);
  }

}
