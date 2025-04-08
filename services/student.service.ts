import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:7057/api/students'; // اپنی API کا URL دیں

  constructor(private http: HttpClient) {}

  // ✅ تمام Students حاصل کریں
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ✅ نیا Student شامل کریں
  addStudent(student: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, student);
  }

  // ✅ Student کو اپڈیٹ کریں
  updateStudent(studentId: number, student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${studentId}`, student);
  }

  // ✅ Student کو ڈیلیٹ کریں
  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  
}
