import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-educational-qualifications',
  templateUrl: './educational-qualifications.component.html',
  styleUrls: ['./educational-qualifications.component.css']
})
export class EducationalQualificationsComponent {

  eduQualsForm = new FormGroup({
    educationalLevel: new FormControl(null, [Validators.required]),
    academicYear: new FormControl(null, [Validators.required]),
    schoolName: new FormControl(null, [Validators.required]),
    coursesName: new FormControl(null, [Validators.required]),
    language: new FormControl(null, [Validators.required]),
    languageLevel: new FormControl(null, [Validators.required]),
  })

  items = [
    { name: 'John', surname: 'Cleese' },
    { name: 'Eric', surname: 'Idle' },
    { name: 'Graham', surname: 'Chapman' },
    { name: 'Michael', surname: 'Palin' },
    { name: 'Terry', surname: 'Gilliam' },
    { name: 'Terry', surname: 'Jones' },
  ];

  stringify = (item: { name: string; surname: string }): string =>
    `${item.name} ${item.surname}`;

}
