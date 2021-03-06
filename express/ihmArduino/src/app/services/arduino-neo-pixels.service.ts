import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArduinoNeoPixelsService {

  constructor(private http: HttpClient) { }

  setColor(red: Number, green: Number, blue: Number): Observable<any> {
    return this.http.post('/neopixel', { color: 'r' + red + 'g' + green + 'b' + blue });
  }

  clear(): Observable<any> {
    return this.http.post('/neopixel', { color: 'r0g0b0' });
  }
}
