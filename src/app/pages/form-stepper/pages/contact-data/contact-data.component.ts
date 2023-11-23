import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `هذه الخانة مطلوبه`,
        pattern: 'أدخل رقم تليفون صحيح'
      }
    }
  ]

})
export class ContactDataComponent {
  contactDataForm = new FormGroup({
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]),
    secondNumber: new FormControl(null, [Validators.pattern(/^(010|011|012|015)\d{8}$/)]),
    address: new FormControl(null, [Validators.required])
  })
}
