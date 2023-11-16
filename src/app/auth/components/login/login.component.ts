import { Component } from '@angular/core';
import { LoginRepository } from 'src/app/domain/login/login.repository';
import { User } from 'src/app/domain/login/models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginRepository: LoginRepository, private authService: AuthService, private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  // loginData: User = {
  //   email: '',
  //   password: '',
  // }

  login() {
    this.loginRepository.add(this.loginForm.value)
    .subscribe((response) => {
        if (response.status===200) {
          this.authService.setToken('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5ZWhuQG91dGxvb2suY29tIiwiaWF0IjoxNzAwMDM3MjMzLCJleHAiOjE3MDAxMjM2MzN9.B0DWWZULT13TahwxSq-g3oQWxne8CSjbaZOUDmfBx5s')
          console.log(response)

          this.router.navigate(['/home'])
        }
    },
    )
  }
  

  // onSubmit(){
  //   console.log(this.loginData)
  //   this.login()
  // }

}
