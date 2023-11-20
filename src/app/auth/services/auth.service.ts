import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router:Router ) { }

  setToken(token:string){
    localStorage.setItem("tokenUser", token);
    document.cookie = `accessValue=${token}`
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
