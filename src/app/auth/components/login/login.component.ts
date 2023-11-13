import { Component } from '@angular/core';
import { LoginRepository } from 'src/app/domain/login/login.repository';
import { User } from 'src/app/domain/login/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginRepository: LoginRepository, private router: Router) { }

  loginData: User = {
    email: '',
    password: ''
  }

  login(userData: User) {
    this.loginRepository.add(userData)
    .subscribe((response) => {
        if (response.status===200) {
          console.log(response)
          this.router.navigate(['/home'])
          // const cookies = response.headers.getAll('expires');
          
          // Now you can use or store the cookies as needed
          // console.log('Cookies:', cookies);
        }
    },
    )
  }
  

  // onSubmit(){
  //   console.log(this.loginData)
  //   this.login()
  // }

}
