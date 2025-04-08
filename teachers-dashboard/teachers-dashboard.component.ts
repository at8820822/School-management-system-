import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TeacherService } from '../services/teacher.service';  // Assume you have a service to fetch teacher data
import { CustomCardComponent } from '../custom-card/custom-card.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-teachers-dashboard',
  standalone:true,
  imports:[CustomCardComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './teachers-dashboard.component.html',
  styleUrls: ['./teachers-dashboard.component.css']
})
export class TeachersDashboardComponent implements OnInit {
  teacher: any;  // To hold the logged-in teacher data
  teachers: any[] = [];  // Array of teachers (for admin/teacher)

  constructor(
    private authService: AuthService,
    private teacherService: TeacherService  // Fetch teacher data if needed
  ) {}

  ngOnInit(): void {
    const data = localStorage.getItem('teacherData');
    if (data) {
      this.teacher = JSON.parse(data);
      console.log("Teacher Dashboard:", this.teacher);
    }
  }
  

  // Example method to edit teacher
  editTeacherById(teacherId: number) {
    console.log('Edit teacher with ID:', teacherId);
    // Implement the logic for editing the teacher
  }

  // Example method to delete teacher
  deleteTeacher(teacherId: number) {
    console.log('Delete teacher with ID:', teacherId);
    // Implement the logic for deleting the teacher
  }
}
