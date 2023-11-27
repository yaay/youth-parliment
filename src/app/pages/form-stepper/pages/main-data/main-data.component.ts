import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { ResourceService } from 'src/app/core/services/resource.service';
import { GovernmentRepository } from 'src/app/domain/government/government.repository';
import { minWordsValidator } from 'src/app/shared/Validators/minWords.validator';
import { TuiDay } from '@taiga-ui/cdk';
import { Router } from '@angular/router';
import { BirthDateFromNationalIdPipe } from 'src/app/shared/pipes/birth-date-from-national-id.pipe';

@Component({
  selector: 'app-main-data',
  templateUrl: './main-data.component.html',
  styleUrls: ['./main-data.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `هذه الخانة مطلوبه`,
        pattern: 'أدخل رقم قومي صحيح',
        minWords: 'يرجي أدخال الاسم رباعي'
      }
    }
  ]
})
export class MainDataComponent {

  constructor(
    private govermentRepository: GovernmentRepository,
    private router: Router) { }

  genders = [{ gender: 'male' }, { gender: 'female' }];


  basicInfoForm = new FormGroup({
    fullName: new FormControl(null, [Validators.required, minWordsValidator(4)]),
    nationalId: new FormControl(null, [Validators.required, Validators.pattern(/^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/)]),
    government: new FormControl(null, [Validators.required]),
    district: new FormControl(''),
    adminstration: new FormControl(''),
    subAdmin: new FormControl(''),
    dob: new FormControl(new TuiDay(2007, 0, 1)),
    gender: new FormControl(null, [Validators.required]),
    religion: new FormControl(''),
    disability: new FormControl(''),
  })

  ngOnInit() {
    this.applyBirthdatefromNationalId()
  }

  applyBirthdatefromNationalId() {
    this.basicInfoForm.get('nationalId')?.valueChanges
      .subscribe((id: any) => {
        const idString = id.toString();
        if (idString.length == 14) {
          console.log('done', idString)
          const formatedDOB = new BirthDateFromNationalIdPipe().transform(idString)
          console.log(formatedDOB)
          this.basicInfoForm.get('dob')?.patchValue(new TuiDay(formatedDOB[0], formatedDOB[1], formatedDOB[2]))
        }
      })
  }

  submit() {
    console.log(this.basicInfoForm)
    this.router.navigate(['/voter-data/contact-data'])
    // this.govermentRepository.get().subscribe((response) => console.log(response))
  }


}
