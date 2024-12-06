import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.services';
import { WeatherCardComponent } from '../WeatherCard/weather-card.component';
import { SearchComponent } from '../Search/search.component';

@Component({
  standalone: true,
  imports: [CommonModule, WeatherCardComponent, SearchComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  preloadedCities = [
    { location: '42.3601,-71.0589', name: 'Boston' },
    { location: '34.0522,-118.2437', name: 'Los Angeles' },
    { location: '40.7128,-74.0060', name: 'New York' },
  ];
  preloadedCitiesWeather: { cityName: string; data: any }[] = [];
  searchedCityWeather: { cityName: string; data: any } | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    // Fetch weather for preloaded cities
    this.preloadedCities.forEach((city) => {
      this.weatherService.getWeather(city.location).subscribe((data) => {
        this.preloadedCitiesWeather.push({ cityName: city.name, data });
      });
    });
  }

  onCitySearch(cityWeather: any): void {
    this.searchedCityWeather = { cityName: 'Searched City', data: cityWeather };
  }
}
