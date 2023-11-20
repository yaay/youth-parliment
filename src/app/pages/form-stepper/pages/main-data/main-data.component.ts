import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { ResourceService } from 'src/app/core/services/resource.service';
import { GovernmentRepository } from 'src/app/domain/government/government.repository';
import { minWordsValidator } from 'src/app/shared/Validators/minWords.validator';

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

  constructor(private govermentRepository: GovernmentRepository) {}

  basicInfoForm = new FormGroup({
    fullName: new FormControl(null, [Validators.required, minWordsValidator(4)]),
    nationalId: new FormControl(null, [Validators.required, Validators.pattern(/^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/)]),
    government: new FormControl(null, [Validators.required]),
    district: new FormControl(''),
    adminstration: new FormControl(''),
    subAdmin: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    religion: new FormControl(''),
    disability: new FormControl(''),
  })

  sumbit(){
    console.log(this.basicInfoForm)
    this.govermentRepository.get().subscribe((response) => console.log(response))
  }

}
