import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.services';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css'],
})
export class CommentSectionComponent implements OnInit {
  @Input() cityId: string = '';
  @Output() commentAdded = new EventEmitter<void>(); // Evento para comunicar al padre

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
        this.commentAdded.emit(); // Emitir evento hacia el componente padre
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
