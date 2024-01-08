import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiValidationError } from '@taiga-ui/cdk';
import { RequestService } from 'src/app/core/services/request.service';
import { StepperStateService } from 'src/app/core/services/stepper-state.service';
import { AcademicYearRepository } from 'src/app/domain/academic-year/academic-year.repository';
import { AcademicYear } from 'src/app/domain/academic-year/models/academic-year';
import { LanguageRepository } from 'src/app/domain/education-language/language.repository';
import { Language } from 'src/app/domain/education-language/models/language';
import { EducationalLevelRepository } from 'src/app/domain/educational-level/educational-level.repository';
import { EducationalLevel } from 'src/app/domain/educational-level/models/educational-level';
import { EducationalLanguageRepository } from 'src/app/domain/educational-qualification-language/educational-language.repository';
import { EducationalQualificationLanguageRepository } from 'src/app/domain/educational-qualification-language/educational-qualification-language.repository';
import { EducationQualificationLanguage } from 'src/app/domain/educational-qualification-language/models/education-qualification-language';
import { EducationalQualificationUpdateRepository } from 'src/app/domain/educational-qualification/educational-qualification-update.repository';
import { EducationalQualificationRepository } from 'src/app/domain/educational-qualification/educational-qualification.repository';
import { EducationQualification } from 'src/app/domain/educational-qualification/models/education-qualification';
import { LanguageLevelRepository } from 'src/app/domain/language-level/language-level.repository';
import { LanguageLevel } from 'src/app/domain/language-level/models/language-level';

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
  languageError = new TuiValidationError(' لا يمكن تكرار اللغة');
  showErrorMsg:boolean=false;
  lang!:{};
  educationalForm!:{};
  requestId!:number;
  constructor(
    private router: Router,
    private stepperStateService: StepperStateService,
    private educationalLevelRepository: EducationalLevelRepository,
    private languageRepository:LanguageRepository,
    private academicYearRepository:AcademicYearRepository,
    private languageLevelRepository:LanguageLevelRepository,
    private educationQualificationRepository:EducationalQualificationRepository,
    private eduQualLanguageRepository: EducationalQualificationLanguageRepository,
    private educationalLanguageRepository:EducationalLanguageRepository,
    private educationalQualificationUpdateRepository:EducationalQualificationUpdateRepository,
    private requestService:RequestService
      ) { }
  languages: EducationQualificationLanguage[] = []
  eduQualsForm = new FormGroup({
    educationalLevel: new FormControl(null, [Validators.required]),
    academicYear: new FormControl(null, [Validators.required]),
    schoolName: new FormControl(null, [Validators.required,Validators.minLength(7)]),
    coursesName: new FormControl(null),
    language: new FormControl(null),
    languageLevel: new FormControl(null),
  })

  getRequestId() {
    this.requestId = this.requestService.requestId();
  }


  addLanguage() {
      this.educationQualificationRepository.getEduQualification(this.requestId).subscribe({
        next:(res)=>{
          this.lang = {
            language: this.eduQualsForm.value.language,
            languageLevel: this.eduQualsForm.value.languageLevel
          }
          this.eduQualLanguageRepository.addEduQualLanguage(res.id,this.lang).subscribe({
            error:_=>{
            this.eduQualsForm.controls.language.reset();
            this.eduQualsForm.controls.languageLevel.reset();
            this.showErrorMsg=true;
            this.langError;
            },
            next:(lang)=>{
              if (lang.language && lang.languageLevel) {
                    if (!this.languages.find(l => l.language === lang.language)) {
                      this.showErrorMsg=false;
                      this.languages.push(lang);
                      this.eduQualsForm.controls.language.reset();
                      this.eduQualsForm.controls.languageLevel.reset();
                    }
                  }
                }
        });
      }});

  }

get langError(): TuiValidationError | null {
  return this.languageError;
}

  handleTagDeleted(emptyTag: any, currentIndex: number,id:number): void {
    this.languages = this.languages
      .map((language, index) => (index === currentIndex ? emptyTag : language))
      .filter(Boolean);
      this.educationalLanguageRepository.deleteLanguage(id).subscribe();
  }

  stringify = (item: { name: string; surname: string }): string =>
    `${item.name} ${item.surname}`;

    back() {
      this.router.navigate(['voter-data/contact-data'], { skipLocationChange: true })
    }

  next() {
    if (this.eduQualsForm.valid) {
        this.educationQualificationRepository.getEduQualification(this.requestId).subscribe({
          next:(res)=>{
              this.educationalForm = {
                id:res.id,
                request:res.request.id,
                academicYear:this.eduQualsForm.value.academicYear,
                educationalLevel:this.eduQualsForm.value.educationalLevel,
                schoolName:this.eduQualsForm.value.schoolName,
                coursesName:this.eduQualsForm.value.coursesName
            }
            this.educationalQualificationUpdateRepository.update(res.id,this.educationalForm).subscribe();
        },
          error: _=>
          {
            this.educationQualificationRepository.addEduQualification(this.requestId,this.eduQualsForm).subscribe();
          }
      }) ;

      this.stepperStateService.eduQualState.set('pass')
      this.router.navigate(['voter-data/attachments'], { skipLocationChange: true })
    } else {
      this.stepperStateService.eduQualState.set('fail')
    }
  }
  ngOnInit(){
    this. getRequestId();
    this.getAllLevels();
    this.getLanguages();
    this.getLanguageLevel();
    this.patchForm();


  }
  patchForm(){
      this.educationQualificationRepository.getEduQualification(this.requestId).subscribe({
        error:()=>{
          this.disbaleAddButton=true;
        },
        next:(res)=>{
          this.eduQualLanguageRepository.getEduQualLanguage(res.id).subscribe(response=>{
            for (let index = 0; index < response.data.length; index++) {
              const element = response.data[index];
              this.languages.push({
                id: element.id,
                language: element.language,
                languageLevel: element.languageLevel
              });
            }
          });
            this.eduQualsForm.patchValue(res);
      }
      });
    };

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
