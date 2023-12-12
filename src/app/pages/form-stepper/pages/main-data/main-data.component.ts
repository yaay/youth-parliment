import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { GovernmentRepository } from 'src/app/domain/government/government.repository';
import { minWordsValidator } from 'src/app/shared/Validators/minWords.validator';
import { TuiDay } from '@taiga-ui/cdk';
import { Router } from '@angular/router';
import { BirthDateFromNationalIdPipe } from 'src/app/shared/pipes/birth-date-from-national-id.pipe';
import { GenderFromNationalIdPipe } from 'src/app/shared/pipes/gender-from-national-id.pipe';
import { StepperStateService } from 'src/app/core/services/stepper-state.service';
import { Government } from 'src/app/domain/government/models/government';

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
    private router: Router,
    private stepperStateService: StepperStateService
  ) { }


  genders = [{ gender: 'male' }, { gender: 'female' }];
  govs: Government[] = [];

  basicInfoForm = new FormGroup({
    fullName: new FormControl(null, [Validators.required, minWordsValidator(4)]),
    nationalId: new FormControl(null, [Validators.required, Validators.pattern(/(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/)]),
    government: new FormControl(null, [Validators.required]),
    district: new FormControl(''),
    adminstration: new FormControl(''),
    subAdmin: new FormControl(''),
    dob: new FormControl(new TuiDay(2007, 0, 1)),
    gender: new FormControl('', [Validators.required]),
    religion: new FormControl('muslim'),
    disability: new FormControl('no'),
  })

  ngOnInit() {
    this.govermentRepository.get().subscribe(
      (response) => {
        this.govs = response.data;
      }
    );
    this.getBirthAndGenderfromId();
  }

  getBirthAndGenderfromId() {
    this.basicInfoForm.get('nationalId')?.valueChanges
      .subscribe((id: any) => {
        const idString = id.toString();
        if (idString.length == 14) {
          const formatedDOB = new BirthDateFromNationalIdPipe().transform(idString)
          this.basicInfoForm.get('dob')?.patchValue(new TuiDay(formatedDOB[0], formatedDOB[1], formatedDOB[2]))
          const gender = new GenderFromNationalIdPipe().transform(idString)
          this.basicInfoForm.get('gender')?.patchValue(gender)
        }
      })
  }

  govStringify = (gov: { arabicName: string }): string =>
    `${gov.arabicName}`;



  next() {
    if (this.basicInfoForm.valid) {
      this.stepperStateService.mainDataState.set('pass')
      this.router.navigate(['/voter-data/contact-data'], { skipLocationChange: true })
    } else {
      this.stepperStateService.mainDataState.set('error')
    }
  }


}
