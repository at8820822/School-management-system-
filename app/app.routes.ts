import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { ClassesComponent } from './classes/classes.component';
import { AuthGuard } from './auth.guard'; // Import AuthGuard
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeachersDashboardComponent } from './teachers-dashboard/teachers-dashboard.component';

// Define the routes
export const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'Student' },
  },
  {
    path: 'teachers-dashboard',
    component: TeachersDashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'Teacher' },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard], // Protect this route with AuthGuard
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [AuthGuard], // Protect this route with AuthGuard
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    canActivate: [AuthGuard], // Protect this route with AuthGuard
  },
 
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: 'login' }, // Wildcard route for unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Register routes
  exports: [RouterModule],
})
export class AppRoutingModule {}
