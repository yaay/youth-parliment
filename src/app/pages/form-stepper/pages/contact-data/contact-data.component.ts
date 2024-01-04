import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { of } from 'rxjs';
import { StepperStateService } from 'src/app/core/services/stepper-state.service';
import { MaskitoOptions } from '@maskito/core';
import { RequestService } from 'src/app/core/services/request.service';
import { RequestContactRepository } from 'src/app/domain/contact/request-contact.repository';
import { ContactRepository } from 'src/app/domain/contact/contact.repository';

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
    private stepperStateService: StepperStateService,
    private requestService: RequestService,
    private requestContact: RequestContactRepository,
    private contactRepository: ContactRepository
  ) { }

  contactDataForm = new FormGroup({
    firstMobileNumber: new FormControl(NaN, [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/), Validators.minLength(11), Validators.maxLength(11)]),
    secondMobileNumber: new FormControl(NaN, [Validators.pattern(/^(010|011|012|015)\d{8}$/), Validators.minLength(11), Validators.maxLength(11)]),
    address: new FormControl('', [Validators.required, Validators.minLength(15)])
  })

  requestId!: number;
  newUser: boolean = false;
  formId!: number;
  readonly maskOptions: MaskitoOptions = {
    mask: Array(11).fill(/\d/)
  };

  arabicOnly: MaskitoOptions = {
    mask: Array(250).fill(/^[\u0621-\u064A\s0-9]+$/)
  }

  ngOnInit() {
    this.getRequestId();
    if (this.contactDataForm.value.address === ''){
      this.getSetFormData();
    }
  }

  getRequestId() {
    this.requestId = this.requestService.requestId();
  }

  getSetFormData() {
    this.requestContact.getContact(this.requestId).subscribe({
      next: (response) => {
        this.contactDataForm.patchValue(response);
        this.formId = response.id;
      },

      error: () => {
        this.newUser = true;
      }
    }
    )
  }


  back() {
    this.router.navigate(['/voter-data/main-data'], { skipLocationChange: true })
  }

  next() {
    if (this.contactDataForm.valid) {
      if (this.newUser) {
        this.requestContact
          .addContact(this.requestId, this.contactDataForm.value)
          .subscribe();
      } else {
        let formattedResource: any = { ...this.contactDataForm.value };
        formattedResource['id'] = this.formId;
        this.contactRepository
          .update(this.formId, formattedResource)
          .subscribe();
      }
      this.stepperStateService.contactState.set('pass');
      this.router.navigate(['/voter-data/edu-qualifications'], { skipLocationChange: true })
    } else {
      this.stepperStateService.contactState.set('error');
    }

  }
}
