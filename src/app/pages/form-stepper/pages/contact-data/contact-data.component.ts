import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `أدخل الأسم`,
        pattern: 'أدخل الرقم القومي'
      }
    }
  ]
})
export class ContactDataComponent {

  govs: any = {
    "data": [
      {
        "id": 1,
        "name": "cairo"
      },
      {
        "id": 2,
        "name": "giza"
      },
      {
        "id": 3,
        "name": "alex"
      },
    ]
  }



  basicInfoForm = new FormGroup({
    fullName: new FormControl(null, [Validators.required]),
    nationalId: new FormControl(null, [Validators.required, Validators.pattern(/^\d{14}$/)]),
    government: new FormControl(),
    district: new FormControl(''),
    adminstration: new FormControl(''),
    subAdmin: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    religion: new FormControl(''),
    disability: new FormControl(''),
  })

  items = [
    {name: 'John', surname: 'Cleese'},
    {name: 'Eric', surname: 'Idle'},
    {name: 'Graham', surname: 'Chapman'},
    {name: 'Michael', surname: 'Palin'},
    {name: 'Terry', surname: 'Gilliam'},
    {name: 'Terry', surname: 'Jones'},
];

 stringify = (item: {name: string; surname: string}): string =>
    `${item.name} ${item.surname}`;

}
