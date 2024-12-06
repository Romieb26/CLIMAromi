import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentSectionComponent } from '../Comments/comment-section.component';

@Component({
  standalone: true,
  imports: [CommonModule, CommentSectionComponent],
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
})
export class WeatherCardComponent {
  @Input() cityWeather: any; // Datos del clima
  @Input() cityName: string = ''; // Nombre de la ciudad
  @Input() cityId: string = ''; // ID de la ciudad

  showCommentsSection: boolean = false;

  get temperature() {
    return this.cityWeather?.timelines?.daily[0]?.values?.temperatureAvg;
  }
  
  get weatherDescription() {
    return this.cityWeather?.timelines?.daily[0]?.values?.weatherCode;
  }
  

  toggleCommentsSection(): void {
    this.showCommentsSection = !this.showCommentsSection;
  }

  handleCommentAdded(): void {
    // Mantener la sección de comentarios abierta después de agregar un comentario
    this.showCommentsSection = true;
  }
}
