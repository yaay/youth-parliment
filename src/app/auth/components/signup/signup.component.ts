import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchpassword } from 'src/app/shared/Validators/matchpassword.directive';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { of } from 'rxjs'
import { SignupRepository } from 'src/app/domain/signup/signup.repository'
import { User } from 'src/app/domain/login/models/user';
import { TuiAlertService } from '@taiga-ui/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required:'هذه الخانه مطلوبة',
        email: 'أدخل بريد الكتروني صحيح',
        minlength: ({ requiredLength }: { requiredLength: string }) =>
        of(`يجب أن تحتوي كلمه المرور علي ${requiredLength} أحرف أو أكثر`),
        // minLength: ({requiredLength}: {requiredLength: string}) => `كلمه المرور يجب أن تحتوي علي ${requiredLength} أحرف او أكثر`,
        pattern: 'كلمه المرور يجب أن تحتوي علي رقم واحد وحرف واحد علي الأقل',
        matchpassword: 'كلمه المرور غير مطابقه',
      }
    }
  ]
})
export class SignupComponent {
  constructor(
    private signupRepository: SignupRepository,
    private alerts: TuiAlertService, 
    private router: Router
    ) {}

  signupForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]),
    confirmPassword: new FormControl(null, [Validators.required])
  },
  {
    validators: matchpassword
  }
  );


  signupError() {
    this.alerts
    .open('البريد الألكتروني موجود بالفعل', {status: 'error', autoClose: 5000})
    .subscribe()
  }
  


  signup() {
    console.log(this.signupForm)

    if(this.signupForm.status==='VALID') {
          let user = {
            email: this.signupForm.value.email,
            password: this.signupForm.value.password
          }
          this.signupRepository.add(user)
          .subscribe({
            error: () => this.signupError(),
            next: () => {
              this.router.navigate(['/login'], {queryParams: { signupSuccess: 'true' }
            })
            }
          })
    }   
  }

}
