import { Injectable } from '@angular/core';//services  the inject ki ja sakti hai dusre components/services mein.
import { HttpClient } from '@angular/common/http';//http ki request 
import { Observable } from 'rxjs';//using as promise jesy 
import { tap } from 'rxjs/operators'; //jaise ke login ke baad localStorage mein token save karna etc.

import { Router } from '@angular/router';

// Login API ke response ka structure define kiya gaya hai:


interface LoginResponse {
  token: string;
  role: string;
  userId: string;
  studentData?: any;
  teacherData?: any;
}
//teel  only one instance use whole app 
@Injectable({

  providedIn: 'root',
})
export class AuthService {
  //api ka bae url for api call for authenication 
  private apiUrl = 'https://localhost:7057/api/auth';
  //ya login user ka data temporary store krta hai 
  private loggedInUser: any = null;
  constructor(private http: HttpClient, private router: Router) {}


  //ya loggedInUser ka data return krta hai after lofin krni k bad 
  getLoggedInUser(): any {
    return this.loggedInUser;
  }

  // Signup api ko post ki request bhjta hai 
  signup(username: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, email, password, role });
  }

  // Login k ly  Login ke liye API call hoti hai. Response milne par:

//Token aur Role localStorage mein save hoti hai
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
  
        if (response.role === 'Student') {
          localStorage.setItem('studentData', JSON.stringify(response.studentData));
          this.loggedInUser = response.studentData;
        } else if (response.role === 'Teacher') {
          localStorage.setItem('teacherData', JSON.stringify(response.teacherData));
          this.loggedInUser = response.teacherData;
        }
      })
    );
  }
  
  
  
  
  saveToken(token: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role); 
    console.log('Saved token and role:', token, role);  // Save role as well
  }
  
  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get role
  getRole(): string | null {
    const role = localStorage.getItem('role');
    console.log('Fetched role from localStorage:', role); // Debugging
    return role;
  }

  // Authentication check
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Role-based checks
  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  isTeacher(): boolean {
    return this.getRole() === 'Teacher';
  }

  isStudent(): boolean {
    return this.getRole() === 'Student';
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
