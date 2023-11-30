import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-educational-qualifications',
  templateUrl: './educational-qualifications.component.html',
  styleUrls: ['./educational-qualifications.component.css']
})
export class EducationalQualificationsComponent {
  languages: {'name': any, 'level': any}[] = []

  eduQualsForm = new FormGroup({
    educationalLevel: new FormControl(null, [Validators.required]),
    academicYear: new FormControl(null, [Validators.required]),
    schoolName: new FormControl(null, [Validators.required]),
    coursesName: new FormControl(null),
    language: new FormControl(null, [Validators.required]),
    languageLevel: new FormControl(null, [Validators.required]),
  })

  addLanguage() {
    let lang = {
      name: this.eduQualsForm.value.language,
      level: this.eduQualsForm.value.languageLevel
    }
    this.languages.push(lang)
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

  langs = [
    'ألانجلبزية',
    'الفرنسية',
    'الألمانية' ,
  ]
  
  langsLevel = [
    'متوسط',
    'مبتدئ',
    'ماقبل المتوسط',
    'متقدم',
    'فوق المتوسط'
  ]

  handleTagDeleted(emptyTag: any, currentIndex: number): void {
    this.languages = this.languages
        .map((language, index) => (index === currentIndex ? emptyTag : language ))
        .filter(Boolean);
}

  stringify = (item: { name: string; surname: string }): string =>
    `${item.name} ${item.surname}`;

    next() {
      console.log('hello', this.eduQualsForm.value)
    }

}
