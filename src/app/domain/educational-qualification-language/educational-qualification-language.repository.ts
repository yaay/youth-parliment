import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";


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
  addEduQualLanguage(eduQualId?: number,resource?:{}): Observable<any> {
    return this.http
      .post(this.APIUrl +`/${eduQualId}` + '/educational-qualification-language',this.toServerModel(resource))
      .pipe(catchError((err) => {
        throw new Error('Error', err.message)
    }))
  }
  getEduQualLanguage(eduQualId?: number): Observable<any> {
    return this.http
    .get(this.APIUrl +`/${eduQualId}` + '/educational-qualification-language')
    .pipe(catchError((err) => {             throw new Error('Error', err.message)
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
