import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router:Router ) { }

  setToken(token:string){
    localStorage.setItem("tokenUser", token);
  }

  getToken() {
    return localStorage.getItem("tokenUser")
  }

  logOut() {
    localStorage.removeItem("tokenUser")
    this.router.navigateByUrl('/login')
  }
}
