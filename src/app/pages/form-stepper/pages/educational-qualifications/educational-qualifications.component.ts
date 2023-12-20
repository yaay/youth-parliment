import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiValidationError } from '@taiga-ui/cdk';
import { StepperStateService } from 'src/app/core/services/stepper-state.service';
import { AcademicYearRepository } from 'src/app/domain/academic-year/academic-year.repository';
import { AcademicYear } from 'src/app/domain/academic-year/models/academic-year';
import { LanguageRepository } from 'src/app/domain/education-language/language.repository';
import { Language } from 'src/app/domain/education-language/models/language';
import { EducationalLevelRepository } from 'src/app/domain/educational-level/educational-level.repository';
import { EducationalLevel } from 'src/app/domain/educational-level/models/educational-level';
import { EducationalQualificationLanguageRepository } from 'src/app/domain/educational-qualification-language/educational-qualification-language.repository';
import { EducationQualificationLanguage } from 'src/app/domain/educational-qualification-language/models/education-qualification-language';
import { EducationalQualificationRepository } from 'src/app/domain/educational-qualification/educational-qualification.repository';
import { EducationQualification } from 'src/app/domain/educational-qualification/models/education-qualification';
import { LanguageLevelRepository } from 'src/app/domain/language-level/language-level.repository';
import { LanguageLevel } from 'src/app/domain/language-level/models/language-level';
import { RequestStatusRepository } from 'src/app/domain/request-status/request-status.repository';

@Component({
  selector: 'app-educational-qualifications',
  templateUrl: './educational-qualifications.component.html',
  styleUrls: ['./educational-qualifications.component.css']
})
export class EducationalQualificationsComponent {
  educationalLevel:EducationalLevel[] = [];
  language:Language[]=[];
  addLang:Language[]=[];
  academicYear:AcademicYear[]=[];
  languageLvl:LanguageLevel[]=[];
  addEduLanguage:EducationQualificationLanguage[]=[];
  educationalQualification:EducationQualification[]=[];
  disbaleAddButton!:boolean;
  requiredError = new TuiValidationError('هذه الخانة مطلوبة');
  lengthOfMin = new TuiValidationError(' يرجي ادخال ٧ حروف علي الاقل');
  constructor(
    private router: Router,
    private stepperStateService: StepperStateService,
    private educationalLevelRepository: EducationalLevelRepository,
    private languageRepository:LanguageRepository,
    private academicYearRepository:AcademicYearRepository,
    private languageLevelRepository:LanguageLevelRepository,
    private reqestRepository: RequestStatusRepository,
    private educationQualificationRepository:EducationalQualificationRepository,
    private eduQualLanguageRepository: EducationalQualificationLanguageRepository
      ) { }
  languages: { 'language': any, 'languageLevel': any }[] = []

  eduQualsForm = new FormGroup({
    educationalLevel: new FormControl(null, [Validators.required]),
    academicYear: new FormControl(null, [Validators.required]),
    schoolName: new FormControl(null, [Validators.required,Validators.minLength(7)]),
    coursesName: new FormControl(null),
    language: new FormControl(null),
    languageLevel: new FormControl(null),
  })

  addLanguage() {
    let lang = {
      language: this.eduQualsForm.value.language,
      languageLevel: this.eduQualsForm.value.languageLevel
    }
    if (lang.language && lang.languageLevel) {
      if (!this.languages.find(l => l.language === lang.language)) {
        this.languages.push(lang)
      }else
      alert ('language already exists');
    }
    this.addEduLanguage=this.eduQualLanguageRepository.toServerModel(lang);
    this.reqestRepository.get().subscribe(result=>{
      this.educationQualificationRepository.getEduQualification(result.id).subscribe({
        next:(res)=>{
          this.eduQualLanguageRepository.addEduQualLanguage(res.id,this.addEduLanguage).subscribe();
        }
      });
    });
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

    back() {
      this.router.navigate(['voter-data/contact-data'], { skipLocationChange: true })
    }

  next() {
    if (this.eduQualsForm.valid) {
      this.educationalQualification=this.educationQualificationRepository.toServerModel(this.eduQualsForm);
      this.reqestRepository.get().subscribe(result=>{
        this.educationQualificationRepository.getEduQualification(result.id).subscribe({
          error: _=>
          {
            this.educationQualificationRepository.addEduQualification(result.id,this.educationalQualification).subscribe();
          }
      }) ;
    });
      this.stepperStateService.eduQualState.set('pass')
      this.router.navigate(['voter-data/attachments'], { skipLocationChange: true })
    } else {
      this.stepperStateService.eduQualState.set('fail')
    }
  }
  ngOnInit(){
    this.getAllLevels();
    this.getLanguages();
    this.getLanguageLevel();
    this.patchForm();

  }
  patchForm(){
    this.reqestRepository.get().subscribe(result =>{
      this.educationQualificationRepository.getEduQualification(result.id).subscribe({
        error:()=>{
          this.disbaleAddButton=true;
        },
        next:(res)=>{
            this.eduQualsForm.patchValue(res);
      }
      });
    });
  }
  getAllLevels() {
    this.educationalLevelRepository.getList().subscribe((result) => {
      this.educationalLevel = result.data;
    });
  }
  getLanguages(){
    this.languageRepository.getList().subscribe((result) => {
      this.language=result.data;
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
  this.languageLevelRepository.getList().subscribe((result) => {
    this.languageLvl=result.data;
  });
}

languageStringify = (language: { arabicName: string }): string =>
`${language.arabicName}`;

eduStringify = (educationalLevel: { arabicName: string }): string =>
`${educationalLevel.arabicName}`;

languageLvlStringify = (languageLvl: { arabicName: string }): string =>
`${languageLvl.arabicName}`;

academicStringify = (academicYear: { arabicName: string }): string =>
`${academicYear.arabicName}`;

get error(): TuiValidationError | null {
  return this.eduQualsForm.controls['academicYear'].hasError('required') ? this.requiredError : null &&
  this.eduQualsForm.controls['educationalLevel'].hasError('required') ? this.requiredError : null &&
  this.eduQualsForm.controls['schoolName'].hasError('required') ? this.requiredError : null;
}
get minLengthError(): TuiValidationError | null {
  return this.eduQualsForm.controls['schoolName'].hasError('minLength') ?
    null : this.lengthOfMin;
}
}
