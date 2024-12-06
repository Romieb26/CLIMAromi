import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.tomorrow.io/v4/weather/forecast';
  private apiKey = 'EGgszyeRNixZE2d6wCvY5QeqWD4UpLm0';

  constructor(private http: HttpClient) {}

  getWeather(location: string): Observable<any> {
    const url = `${this.apiUrl}?location=${location}&apikey=${this.apiKey}&timesteps=1d&units=metric`;
    return this.http.get<any>(url);
  }
}
