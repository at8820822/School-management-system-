import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Make sure the path to AuthService is correct
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone:true,
  imports:[CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Get the role from the AuthService
    this.userRole = this.authService.getRole();
    console.log('User role:', this.userRole);
    // If there's no role or user is not authenticated, redirect to login
    if (!this.userRole) {
      this.router.navigate(['/login']);
    }
  }

  isAdmin() {
    return this.userRole === 'Admin';
  }

  isTeacher() {
    return this.userRole === 'Teacher';
  }

  isStudent() {
    return this.userRole === 'Student';
  }
}


