import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Role from backend:', response.role);
          this.authService.saveToken(response.token, response.role);

          switch (response.role) {
            case 'Admin':
              this.router.navigate(['/home']);
              break;
            case 'Teacher':
              this.router.navigate(['/teachers-dashboard']);
              break;
            case 'Student':
              this.router.navigate(['/student-dashboard']);
              break;
            default:
              this.router.navigate(['/home']);
              break;
          }
        },
        error: (err) => {
          this.errorMessage = 'Invalid email or password.';
          console.error('Login failed:', err);
        }
      });
    }
  }
}
