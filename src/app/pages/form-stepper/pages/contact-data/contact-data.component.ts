import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { of } from 'rxjs';
import { StepperStateService } from 'src/app/core/services/stepper-state.service';
import {MaskitoOptions} from '@maskito/core';

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
        minlength: ({ requiredLength }: { requiredLength: string }) =>
          of(`يرجي إدخال علي الأقل ${requiredLength} حرف`)
      }
    }
  ],

})
export class ContactDataComponent {
  constructor(
    private router: Router,
    private stepperStateService: StepperStateService
  ) { }

  contactDataForm = new FormGroup({
    phoneNumber: new FormControl(null, [Validators.required,Validators.pattern(/^(010|011|012|015)\d{8}$/),Validators.minLength(11),Validators.maxLength(11)]),
    secondNumber: new FormControl(null, [Validators.pattern(/^(010|011|012|015)\d{8}$/),Validators.minLength(11),Validators.maxLength(11)]),
    address: new FormControl(null, [Validators.required, Validators.minLength(15)])
  })

readonly maskOptions: MaskitoOptions = {
  mask: [
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
  ],
};

  next() {
    if (this.contactDataForm.valid) {
      this.stepperStateService.contactState.set('pass');
      this.router.navigate(['/voter-data/edu-qualifications'])
    } else {
      this.stepperStateService.contactState.set('fail');
    }

  }
}
