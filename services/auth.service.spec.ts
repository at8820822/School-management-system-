import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import AuthService

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the JWT token from AuthService
    const token = this.authService.getToken();

    // Clone the request and add the Authorization header if token exists
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`, // Add token to the Authorization header
        },
      });
      return next.handle(clonedRequest); // Forward the cloned request
    }

    // If no token, send the request without the Authorization header
    return next.handle(req);
  }
}
