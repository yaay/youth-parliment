import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
  providedIn: 'root',
})
export class EducationalQualificationRepository extends ResourceService {
  constructor(http: HttpClient) {
    super(http);
  }
  getResourceUrl(): string {
    return '/request';
  }
  addEduQualification(eduQualId: any,resource:any): Observable<any> {
    return this.http
      .post(this.APIUrl +`/${eduQualId}` + '/educational-qualification',resource)
      .pipe(catchError((err) => {
        throw new Error('Error', err.message)
    }))
}
getEduQualification(eduQualId: any): Observable<any> {
  return this.http
    .get(this.APIUrl +`/${eduQualId}` + '/educational-qualification')
    .pipe(catchError((err) => {
      throw new Error('Error', err.message)
  }))
}
  override toServerModel(entity: any): any {
  return {
    educationalLevel: { id: entity.value.educationalLevel.id },
    academicYear: {
      id: entity.value.academicYear.id
    },
    schoolName:entity.value.schoolName,
    coursesName:entity.value.coursesName,
  };
}

}
