import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";
import { environment } from "src/environments/environment";
import { Language } from "../education-language/models/language";
import { LanguageLevel } from "../language-level/models/language-level";
import { EducationQualificationLanguage } from "./models/education-qualification-language";
import { Response } from "src/app/core/models/response";

@Injectable({
  providedIn: 'root',
})
export class EducationalQualificationLanguageRepository extends ResourceService{
  Url = environment.apiUrl + '/educational-qualification';

  constructor(http: HttpClient) {
    super(http);
  }
  getResourceUrl(): string {
    return '/educational-qualification-language';
  }
  addEduQualLanguage(eduQualId: number,language:Language,languageLevel:LanguageLevel): Observable<EducationQualificationLanguage> {
    let lang = {
      language: { id:language.id },
      languageLevel: {
        id:languageLevel.id
      },
    }
    return this.http
      .post<EducationQualificationLanguage>(this.Url +`/${eduQualId}` + this.getResourceUrl(),lang)
      .pipe(catchError((err) => {
        throw new Error('Error', err.message)
    }))
  }
  getEduQualLanguage(eduQualId: number): Observable<Response<EducationQualificationLanguage>> {
    return this.http
    .get<Response<EducationQualificationLanguage>>(this.Url +`/${eduQualId}` + this.getResourceUrl())
    .pipe(catchError((err) => {             throw new Error('Error', err.message)
  }))
  }


}
