import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchpassword } from 'src/app/shared/Validators/matchpassword.directive';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { of } from 'rxjs'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required:({ smth }: {smth: any}) => of(`enter ${smth}`),
        email: 'أدخل بريد الكتروني صحيح',
        minlength: ({ requiredLength }: { requiredLength: string }) =>
        of(`يجب أن تحتوي كلمه المرور علي ${requiredLength} أحرف أو أكثر`),
        // minLength: ({requiredLength}: {requiredLength: string}) => `كلمه المرور يجب أن تحتوي علي ${requiredLength} أحرف او أكثر`,
        pattern: 'كلمه المرور يجب أن تحتوي علي رقم واحد وحرف واحد علي الأقل',
        matchpassword: 'كلمه المرور غير مطابقه'
      }
    }
  ]
})
export class SignupComponent {

  signupForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]),
    confirmPassword: new FormControl(null, [Validators.required])
  },
  {
    validators: matchpassword
  }
  );


  signup() {
    console.log(this.signupForm)
  }

}
