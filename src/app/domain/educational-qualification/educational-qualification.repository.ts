import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";
import { environment } from "src/environments/environment";
import { EducationQualification } from "./models/education-qualification";

@Injectable({
  providedIn: 'root',
})
export class EducationalQualificationRepository extends ResourceService {
  Url = environment.apiUrl + '/request';

  constructor(http: HttpClient) {
    super(http);
  }
  getResourceUrl(): string {
    return '/educational-qualification';
  }
  addEduQualification(eduQualId: number,resource:EducationQualification): Observable<EducationQualification> {
    return this.http
      .post<EducationQualification>(this.Url +`/${eduQualId}` + this.getResourceUrl(),this.toServerModel(resource))
      .pipe(catchError((err) => {
        throw new Error('Error', err.message)
    }))
  }
  getEduQualification(eduQualId: number): Observable<EducationQualification> {
    return this.http
      .get<EducationQualification>(this.Url +`/${eduQualId}` + this.getResourceUrl())
      .pipe(catchError((err) => {
        throw new Error('Error', err.message)
    }))
  }

  override toServerModel(entity: EducationQualification): any {
  return {
    educationalLevel: { id: entity.educationalLevel.id },
    academicYear: {
      id: entity.academicYear.id
    },
    schoolName:entity.schoolName,
    coursesName:entity.coursesName,
  };
}
}
