import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArduinoNeoPixelsService {

  constructor(private http: HttpClient) { }

  setColor(color: string): Observable<any> {
    return this.http.post('/neopixel', { color: color });
  }
}
