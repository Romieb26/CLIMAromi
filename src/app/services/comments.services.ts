import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiUrl = 'http://localhost:8000/api/comentario';

  constructor(private http: HttpClient) {}

  // Obtener los comentarios para una ciudad
  getComments(cityId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?cityId=${cityId}`);
  }

  // Agregar un comentario a una ciudad
  addComment(cityId: string, comment: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { cityId, comment });
  }

  // Actualizar un comentario
  updateComment(commentId: string, comment: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${commentId}`, { comment });
  }

  // Eliminar un comentario
  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${commentId}`);
  }
}
