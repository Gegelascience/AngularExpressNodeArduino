import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UltrasonService {

  constructor(private http: HttpClient) { }

  getDistance(): Observable<any> {
    return this.http.get('/distance');
  }
}
