import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";
import { EducationQualificationLanguage } from "./models/education-qualification-language";

@Injectable({
  providedIn: 'root',
})
export class EducationalQualificationLanguageRepository extends ResourceService {
  constructor(http: HttpClient) {
    super(http);
  }
  getResourceUrl(): string {
    return '/educational-qualification';
  }
  addEduQualLanguage(eduQualId?: number,resource?:EducationQualificationLanguage[]): Observable<any> {
    return this.http
      .post(this.APIUrl +`/${eduQualId}` + '/educational-qualification-language',resource)
      .pipe(catchError((err) => {
        throw new Error('Error', err.message)
    }))
}
  override toServerModel(entity:any): any {
  return {
    language: { id: entity.language.id },
    languageLevel: {
      id: entity.languageLevel.id
    },
  };
}

}
