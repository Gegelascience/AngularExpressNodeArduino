import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArduinoTemperatureService {

  constructor(private http: HttpClient) { }

  getTemperature(): Observable<any> {
    return this.http.get('/temperature');
  }
}
