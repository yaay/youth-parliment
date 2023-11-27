import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-educational-qualifications',
  templateUrl: './educational-qualifications.component.html',
  styleUrls: ['./educational-qualifications.component.css']
})
export class EducationalQualificationsComponent {
  languages!: {'name': any, 'level': any}[]

  eduQualsForm = new FormGroup({
    educationalLevel: new FormControl(null, [Validators.required]),
    academicYear: new FormControl(null, [Validators.required]),
    schoolName: new FormControl(null, [Validators.required]),
    coursesName: new FormControl(null),
    language: new FormControl(null, [Validators.required]),
    languageLevel: new FormControl(null, [Validators.required]),
  })

  addLanguage() {
    this.languages.push({
      'name': this.eduQualsForm.value.language,
      'level': this.eduQualsForm.value.languageLevel
    })
    console.log(this.languages)
  }

  items = [
    { name: 'John', surname: 'Cleese' },
    { name: 'Eric', surname: 'Idle' },
    { name: 'Graham', surname: 'Chapman' },
    { name: 'Michael', surname: 'Palin' },
    { name: 'Terry', surname: 'Gilliam' },
    { name: 'Terry', surname: 'Jones' },
  ];

  items2 = [
    'Graham',
    'Michael',
    'Terry' ,
  ]

  stringify = (item: { name: string; surname: string }): string =>
    `${item.name} ${item.surname}`;

    next() {
      console.log('hello', this.eduQualsForm.value)
    }

}
