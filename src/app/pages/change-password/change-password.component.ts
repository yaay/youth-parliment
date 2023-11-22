import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { of } from 'rxjs';
import { ChangePasswordRepository } from 'src/app/domain/change-password/change-password.repository';
import { changePassword } from 'src/app/domain/change-password/models/change-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [{
    provide: TUI_VALIDATION_ERRORS,
    useValue: {
      required:'هذه الخانه مطلوبة',
      minlength: ({ requiredLength }: { requiredLength: string }) =>
      of(`يجب أن تحتوي كلمه المرور علي ${requiredLength} أحرف أو أكثر`),
      // minLength: ({requiredLength}: {requiredLength: string}) => `كلمه المرور يجب أن تحتوي علي ${requiredLength} أحرف او أكثر`,
      pattern: 'كلمه المرور يجب أن تحتوي علي رقم واحد وحرف واحد علي الأقل',
    }
  }]
})
export class ChangePasswordComponent {

  constructor(private changePasswordRepository: ChangePasswordRepository) {}

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required,
                                        Validators.minLength(6),
                                        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)])
  })

  submit() {
    console.log(this.changePasswordForm.value)
    const formValue = this.changePasswordForm.value
    this.changePasswordRepository.add(formValue).subscribe(
      (response) => console.log(response)
    )

  }

}

