import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router:Router, private cookieService: CookieService ) { }

  setToken(token:string){
    localStorage.setItem("tokenUser", token);
    this.cookieService.set('accessValue', token)
  }

  getCookie() {
    this.cookieService.get('accessValue')
  }

  getToken() {
    return localStorage.getItem("tokenUser")
  }

  logOut() {
    localStorage.removeItem("tokenUser")
    this.router.navigateByUrl('/login')
  }

  checkUserStatus() {
    if (this.getToken()) {
      return true
    } else {
      return false
    }
  }
}
