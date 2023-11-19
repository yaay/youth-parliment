import { Component } from '@angular/core';
import { LoginRepository } from 'src/app/domain/login/login.repository';
import { User } from 'src/app/domain/login/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { TuiAlertService } from '@taiga-ui/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private loginRepository: LoginRepository,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alerts: TuiAlertService, 
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['signupSuccess']) {
        this.executeOnSuccessfulSignup()
      }
    })
  }

  executeOnSuccessfulSignup() {
    this.alerts
    .open('تم التسجيل بنجاح', {status: 'success', autoClose: 5000})
    .subscribe()
  }

  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  login() {
    this.loginRepository.add(this.loginForm.value)
    .subscribe((response) => {
      console.log('1st ', response)
        if (response.status===200) {
          this.authService.setToken('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5ZWhuQG91dGxvb2suY29tIiwiaWF0IjoxNzAwMDM3MjMzLCJleHAiOjE3MDAxMjM2MzN9.B0DWWZULT13TahwxSq-g3oQWxne8CSjbaZOUDmfBx5s')
          console.log(response)

          this.router.navigate(['/home'])
        }
    },
    )
  }

  groups = [
    {
      label: 'hello',
      items: [
        {
          label: 'something',
          routerLink: 'nothing'
        }
      ]
    }
  ]
}
