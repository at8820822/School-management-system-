import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css']
})
export class CustomCardComponent {
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() dateOfBirth: string = '';
  @Input() email: string = '';
  @Input() phoneNumber: string = '';
  @Input() address: string = '';
  @Input() studentId!: number;

  // Additional fields for teachers
  @Input() gender: string = '';
  @Input() subject: string = '';

  // Emit events to parent
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();

  handleDelete() {
    this.onDelete.emit(this.studentId);  // Emit delete event with studentId
  }

  handleEdit() {
    this.onEdit.emit(this.studentId);  // Emit edit event with studentId
  }
}
