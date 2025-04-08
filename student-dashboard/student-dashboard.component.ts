import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomCardComponent } from '../custom-card/custom-card.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomCardComponent],  // Import the custom card component
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  student: any;  // To hold the logged-in student data

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get the logged-in student details from AuthService
    const studentData = localStorage.getItem('studentData');
    if (studentData) {
      this.student = JSON.parse(studentData);
    }
  }
}
