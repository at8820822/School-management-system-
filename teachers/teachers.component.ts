import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherService, Teacher } from '../services/teacher.service';
import { CommonModule } from '@angular/common';
import { CustomCardComponent } from '../custom-card/custom-card.component';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,CustomCardComponent],
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teacherForm: FormGroup;
  teachers: Teacher[] = [{ id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', phoneNumber: '123-456-7890', address: '123 Street, City', dateOfBirth: '1985-06-15', gender: 'Female', subject: 'Mathematics' },
    { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', phoneNumber: '987-654-3210', address: '456 Avenue, City', dateOfBirth: '1980-03-22', gender: 'Male', subject: 'Science' }];
  editMode = false;
  selectedTeacherId: number | null = null;

  constructor(private fb: FormBuilder, private teacherService: TeacherService) {
    this.teacherForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      subject: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  getAllTeachers() {
    this.teacherService.getTeachers().subscribe((data: Teacher[]) => {
      this.teachers = data;
    });
  }

  onSubmit() {
    if (this.teacherForm.valid) {
      if (this.editMode) {
        this.updateTeacher();
      } else {
        this.addTeacher();
      }
    }
  }

  addTeacher() {
    this.teacherService.addTeacher(this.teacherForm.value).subscribe((newTeacher: Teacher) => {
      this.teachers.push(newTeacher);
      this.teacherForm.reset();
    });
  }
  editTeacherById(id: number) {
    const teacher = this.teachers.find(t => t.id === id);
    if (teacher) {
      this.editTeacher(teacher);
    }
  }

  editTeacher(teacher: Teacher) {
    this.editMode = true;
    this.selectedTeacherId = teacher.id;
    this.teacherForm.patchValue(teacher);
  }

  updateTeacher() {
    if (this.selectedTeacherId === null) return;
    const updatedTeacher = { ...this.teacherForm.value, id: this.selectedTeacherId };
    this.teacherService.updateTeacher(updatedTeacher.id, updatedTeacher).subscribe(() => {
      this.getAllTeachers();
      this.editMode = false;
      this.selectedTeacherId = null;
    });
  }

  deleteTeacher(id: number) {
    this.teacherService.deleteTeacher(id).subscribe(() => {
      this.teachers = this.teachers.filter(t => t.id !== id);
    });
  }
}
