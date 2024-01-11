import { Component } from '@angular/core';
import { LoginRepository } from 'src/app/domain/login/login.repository';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute,
    private alerts: TuiAlertService,
  ) { }

  loader: boolean = false;

  ngOnInit(): void {
    this.noticationService()
  }

  noticationService() {
    this.route.queryParams.subscribe(params => {
      if (params['signupSuccess']) {
        this.executeOnSuccessfulSignup()
      } else if (params['passwordReset']) {
        this.executeOnPasswordReset()
      }
    })
  }



  executeOnSuccessfulSignup() {
    this.alerts
      .open('تم التسجيل بنجاح', { status: 'success', autoClose: 5000 })
      .subscribe()
  }
  executeOnPasswordReset() {
    this.alerts
      .open('تم ارسال رابط تغيير كلمة المرور الي البريد الالكتروني', { status: 'success', autoClose: 5000 })
      .subscribe()
  }

  executeOnFailedLogin() {
    this.toggleLoader()
    this.alerts
      .open('برجاء التأكد من صحه البريد الألكتروني و كلمه المرور', { status: 'error', autoClose: 5000 })
      .subscribe()
  }

  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  login() {
    this.toggleLoader()
    this.loginRepository.add(this.loginForm.value)
      .subscribe(
        {
          error: () => this.executeOnFailedLogin(),
          next: (response) => {
            if (response.status === 200) {
              this.router.navigate(['/home'])

            }
          }
        })
  }


  toggleLoader() {
    this.loader = !this.loader
  }
  
}
