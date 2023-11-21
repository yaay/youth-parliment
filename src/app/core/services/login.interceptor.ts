import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.cookieService.get('accessValue')
    console.log('the token', token)
 
    const modifiedRequest = request.clone({
      withCredentials: true,
      setHeaders: {
        Cookie:`accessToken=${token}`
      }
    });


    // console.log('Intercepted request2', modifiedRequest) 

    return next.handle(modifiedRequest);
  }
}


