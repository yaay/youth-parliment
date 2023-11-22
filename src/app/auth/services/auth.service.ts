import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router:Router, private cookieService: CookieService ) { }

  date = new Date()
  nextDate = new Date()
  nextDay = this.date.setDate(this.nextDate.getDate() + 1);

  setToken(){
    this.cookieService.set('accessToken', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5ZWhuQG91dGxvb2suY29tIiwiaWF0IjoxNzAwNjU3MzI0LCJleHAiOjE3MDA3NDM3MjR9.rGRe5221dPp3_NRfu36D6jloXyR4AHpS7eT5KIxETwc', this.nextDay)
  }

  getCookie() {
    this.cookieService.get('accessToken')
  }

  getToken() {
    return localStorage.getItem("tokenUser")
  }

  checkCookie() {
    return this.cookieService.check('accessToken')
  }

  logOut() {
    localStorage.removeItem("tokenUser")
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
