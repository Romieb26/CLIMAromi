import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.services';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';
  @Output() citySearched = new EventEmitter<any>();

  constructor(private weatherService: WeatherService) {}

  searchCity(): void {
    if (this.searchTerm) {
      this.weatherService.getWeather(this.searchTerm).subscribe(data => {
        const cityWeather = {
          cityName: this.searchTerm, // Asigna el nombre de la ciudad
          cityWeather: data, // Incluye los datos del clima
        };
        this.citySearched.emit(cityWeather); // Emitir los datos en el formato correcto
      });
    }
  }
  
}
