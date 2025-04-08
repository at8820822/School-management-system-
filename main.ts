import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
import { AuthInterceptor } from './app/services/auth-interceptor.service';
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),provideHttpClient(), 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
   
}).catch(err => console.error(err));