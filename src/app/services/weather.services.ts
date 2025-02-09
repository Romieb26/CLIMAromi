import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.tomorrow.io/v4/weather/forecast';
  private apiKey = 'hr8LToOvfovWcr71yX2pxAYuu2D5dgf3';

  constructor(private http: HttpClient) {}

  getWeather(location: string): Observable<any> {
    const url = `${this.apiUrl}?location=${location}&apikey=${this.apiKey}&timesteps=1d&units=metric`;
    return this.http.get<any>(url);
  }
}
