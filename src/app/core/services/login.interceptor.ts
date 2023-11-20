import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.authService.getToken()

    const modifiedRequest = request.clone({
      withCredentials: true,
      setHeaders: {
        Cookie: `accessToken=${token}`
      }
    });

    console.log('Intercepted request2', modifiedRequest) 

    return next.handle(modifiedRequest);
  }
}


