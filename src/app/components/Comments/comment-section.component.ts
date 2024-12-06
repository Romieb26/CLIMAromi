import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.services';
import { FormsModule } from '@angular/forms';  // Importa FormsModule en lugar de NgModel
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule,NgIf,NgFor],  // Agrega FormsModule aquí
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css'],
})
export class CommentSectionComponent implements OnInit {
  @Input() cityId: string = ''; // Recibe el ID de la ciudad
  comments: any[] = [];
  newComment: string = '';
  isEditing: boolean = false;
  editingCommentId: string = '';
  editingCommentText: string = '';

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    if (this.cityId) {
      this.commentsService.getComments(this.cityId).subscribe((comments) => {
        this.comments = comments;
      });
    }
  }

  addComment(): void {
    if (this.newComment.trim()) {
      this.commentsService.addComment(this.cityId, this.newComment).subscribe(() => {
        this.newComment = '';
        this.loadComments();
      });
    }
  }

  editComment(commentId: string, commentText: string): void {
    this.isEditing = true;
    this.editingCommentId = commentId;
    this.editingCommentText = commentText;
  }

  updateComment(): void {
    if (this.editingCommentText.trim()) {
      this.commentsService.updateComment(this.editingCommentId, this.editingCommentText).subscribe(() => {
        this.isEditing = false;
        this.editingCommentId = '';
        this.editingCommentText = '';
        this.loadComments();
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingCommentId = '';
    this.editingCommentText = '';
  }

  deleteComment(commentId: string): void {
    this.commentsService.deleteComment(commentId).subscribe(() => {
      this.loadComments();
    });
  }
}
