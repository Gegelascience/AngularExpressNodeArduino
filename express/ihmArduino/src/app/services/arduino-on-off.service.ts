import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArduinoOnOffService {
  constructor(private http: HttpClient) { }

  updateLight(value: string): Observable<any> {
    return this.http.post('/light', { light: 'led ' + value });
  }
}
