import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router:Router, private cookieService: CookieService ) { }

  auth = false

  setAuth(){
    this.auth = true
  }

  getCookie() {
    this.cookieService.get('accessToken')
  }

  getToken() {
    return localStorage.getItem("tokenUser")
  }

  checkCookie() {
    // return this.cookieService.check('accessToken')
    return this.auth
  }

  logOut() {
    // localStorage.removeItem("tokenUser")
    this.auth = false
    this.router.navigateByUrl('/login')
  }

  checkUserStatus() {
    if (this.checkCookie()) {
      return true
    } else {
      return false
    }
  }
}
