import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.services';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-heroic-zone',
  templateUrl: './HeroicZone.component.html',
  styleUrls: ['./HeroicZone.component.css']
})
export class HeroicZoneComponent implements OnInit {
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeather().subscribe(data => {
      this.weatherData = data;
    });
  }
}