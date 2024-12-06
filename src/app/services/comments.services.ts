import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiUrl = 'http://localhost:8000/api/comentario';

  constructor(private http: HttpClient) {}

  // Obtener comentarios por ciudad
  getComments(cityId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?cityId=${cityId}`);
  }

  // Agregar un nuevo comentario
  addComment(cityId: string, comment: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { cityId, comment });
  }

  // Actualizar un comentario existente
  updateComment(commentId: string, comment: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${commentId}`, { comment });
  }

  // Eliminar un comentario (marcar como eliminado)
  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${commentId}`);
  }
}
