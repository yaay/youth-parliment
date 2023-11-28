import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { of } from 'rxjs';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `هذه الخانة مطلوبه`,
        pattern: 'أدخل رقم تليفون صحيح',
        minlength: ({requiredLength}: {requiredLength: string}) =>
              of(`يرجي إدخال علي الأقل ${requiredLength} حرف`)
      }
    }
  ]

})
export class ContactDataComponent {
  constructor(private router: Router) {}


  contactDataForm = new FormGroup({
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]),
    secondNumber: new FormControl(null, [Validators.pattern(/^(010|011|012|015)\d{8}$/)]),
    address: new FormControl(null, [Validators.required, Validators.minLength(15)])
  })

  next() {
    console.log(this.contactDataForm.value)
    this.router.navigate(['/voter-data/edu-qualifications'])

  }
}
