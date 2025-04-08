import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';  // Import your AuthService

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  loginError: string = ''; 
  signupError: string = ''; 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService  // Inject AuthService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { email, username, password, role } = this.signupForm.value;
  
      this.authService.signup(username, email, password, role).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
  
          this.authService.login(email, password).subscribe({
            next: (loginResponse) => {
              this.authService.saveToken(loginResponse.token, loginResponse.role);
              console.log('User logged in after signup:', loginResponse);
  
              // 🚀 Role-based redirect
              switch (loginResponse.role) {
                case 'admin':
                  this.router.navigate(['/home']);
                  break;
                case 'teacher':
                  this.router.navigate(['/teachers-dashboard']);
                  break;
                case 'student':
                  this.router.navigate(['/student-dashboard']);
                  break;
                default:
                  this.router.navigate(['/home']);
                  break;
              }
            },
            error: (err) => {
              console.error('Login failed after signup:', err);
              alert('Login failed after signup');
            }
          });
        },
        error: (err) => {
          console.error('Signup failed:', err);
          alert('Signup failed: ' + err.message);
        }
      });
    }
  }
  
  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
