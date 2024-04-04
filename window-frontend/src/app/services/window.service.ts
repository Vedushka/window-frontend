import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  url = environment.apiUrl + "/api/window";

  constructor(
    private http: HttpClient
  ) { }

  updateWindow(body: Window): Observable<Window> {
    return this.http.post<Window>(this.url, body);
  };

  getWindow(): Observable<Window> {
    return this.http.get<Window>(this.url);
  };
}

export interface Window{
  width: number;
  height: number;
}
