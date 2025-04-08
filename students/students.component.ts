import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { CustomCardComponent } from '../custom-card/custom-card.component';  
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CustomCardComponent],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  studentForm: FormGroup;
  
  students: Student[] = [{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '123-456-7890', address: '123 Street, City', dateOfBirth: '2000-01-01' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', phoneNumber: '987-654-3210', address: '456 Avenue, City', dateOfBirth: '1998-02-14' }];
  editMode = false;
  selectedStudentId: number | null = null;

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      tosAccepted: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.editMode ? this.updateStudent() : this.addStudent();
    }
  }

  addStudent() {
    this.studentService.addStudent(this.studentForm.value).pipe(
      catchError(err => {
        console.error(err);
        return of([]); // return an empty array or handle error appropriately
      })
    ).subscribe((newStudent: Student) => {
      if (newStudent) {
        this.students.push(newStudent);
        this.resetForm();
      }
    });
  }

  editStudent(id: number): void {
    const student = this.students.find(s => s.id === id);
    if (!student) return;

    this.editMode = true;
    this.selectedStudentId = id;
    this.studentForm.patchValue({
      firstName: student.firstName,
      lastName: student.lastName,
      dateOfBirth: student.dateOfBirth,
      email: student.email,
      phoneNumber: student.phoneNumber,
      address: student.address
    });
  }

  updateStudent() {
    if (this.selectedStudentId === null) return;

    const updatedStudent: Student = {
      ...this.studentForm.value,
      id: this.selectedStudentId
    };

    this.studentService.updateStudent(updatedStudent.id, updatedStudent).pipe(
      catchError(err => {
        console.error(err);
        return of(null); // handle error here
      })
    ).subscribe(() => {
      const index = this.students.findIndex(s => s.id === this.selectedStudentId);
      if (index !== -1) {
        this.students[index] = updatedStudent;
      }
      this.resetForm();
    });
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).pipe(
      catchError(err => {
        console.error(err);
        return of(null); // handle error here
      })
    ).subscribe(() => {
      this.students = this.students.filter(s => s.id !== id);
    });
  }

  resetForm() {
    this.studentForm.reset();
    this.editMode = false;
    this.selectedStudentId = null;
  }
}
