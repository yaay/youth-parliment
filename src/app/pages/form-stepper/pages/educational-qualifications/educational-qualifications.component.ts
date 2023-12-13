import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StepperStateService } from 'src/app/core/services/stepper-state.service';
import { AcademicYearRepository } from 'src/app/domain/academic-year/academic-year.repository';
import { AcademicYear } from 'src/app/domain/academic-year/models/academic-year';
import { LanguageRepository } from 'src/app/domain/edu-language/language.repository';
import { Language } from 'src/app/domain/edu-language/models/language';
import { EducationalLevelRepository } from 'src/app/domain/educational-level/educational-level.repository';
import { EducationalLevel } from 'src/app/domain/educational-level/models/educational-level';
import { LanguageLevelRepository } from 'src/app/domain/language-level/language-level.repository';
import { LanguageLevel } from 'src/app/domain/language-level/models/language-level';

@Component({
  selector: 'app-educational-qualifications',
  templateUrl: './educational-qualifications.component.html',
  styleUrls: ['./educational-qualifications.component.css']
})
export class EducationalQualificationsComponent {
  educationalLevel:EducationalLevel[] = [];
  academicYear:AcademicYear[]=[];
  languageLvl:LanguageLevel[]=[];
  language:Language[]=[];
  constructor(
    private router: Router,
    private stepperStateService: StepperStateService,
    private educationalLevelRepository: EducationalLevelRepository,
    private academicYearRepository:AcademicYearRepository,
    private languageLvlRepository:LanguageLevelRepository,
    private LangRepository:LanguageRepository
  ) { }
  languages: { 'name': any, 'level': any }[] = []

  eduQualsForm = new FormGroup({
    educationalLevel: new FormControl(null, [Validators.required]),
    academicYear: new FormControl(null, [Validators.required]),
    schoolName: new FormControl(null, [Validators.required]),
    coursesName: new FormControl(null),
    language: new FormControl(null),
    languageLevel: new FormControl(null),
  })

  addLanguage() {
    let lang = {
      name: this.eduQualsForm.value.language,
      level: this.eduQualsForm.value.languageLevel
    }
    // if statement to check if lang.name isnt inside languages array
    if (lang.name && lang.level) {
      if (!this.languages.find(l => l.name === lang.name)) {
        this.languages.push(lang)
      } else console.log('language already exists')
    }
  }


  items2 = [
    'Graham',
    'Michael',
    'Terry',
  ]

  langs = [
    'ألانجلبزية',
    'الفرنسية',
    'الألمانية',
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
      .map((language, index) => (index === currentIndex ? emptyTag : language))
      .filter(Boolean);
  }

  stringify = (item: { name: string; surname: string }): string =>
    `${item.name} ${item.surname}`;

  next() {
    if (this.eduQualsForm.valid) {
      console.log(this.eduQualsForm.value)
      this.stepperStateService.eduQualState.set('pass')
      this.router.navigate(['voter-data/attachments'])
    } else {
      this.stepperStateService.eduQualState.set('fail')
    }
  }

  ngOnInit(){
    this.getAllLevels();
    this.getLanguageLevel();
    this.getLanguages();
  }
  getAllLevels() {
    this.educationalLevelRepository.getList().subscribe((result) => {
      this.educationalLevel=result.data;
    });
  }

  getAcademicYear(){
    this.eduQualsForm.get('academicYear')?.reset();
    const id = this.eduQualsForm.value.educationalLevel?.['id'];
    this.academicYearRepository.getAcademicYear(id).subscribe((result) => {
      this.academicYear=result.data;
    });

  }
  getLanguageLevel(){
    this.languageLvlRepository.getList().subscribe((result) => {
      this.languageLvl=result.data;
    });
  }
  getLanguages(){
    this.LangRepository.getList().subscribe((result) => {
      this.language=result.data;
  });
}
  languageStringify = (language: { arabicName: string }): string =>
  `${language.arabicName}`;

  languageLvlStringify = (languageLvl: { arabicName: string }): string =>
  `${languageLvl.arabicName}`;

  eduStringify = (educationalLevel: { arabicName: string }): string =>
    `${educationalLevel.arabicName}`;

  academicStringify = (academicYear: { arabicName: string }): string =>
    `${academicYear.arabicName}`;

}
