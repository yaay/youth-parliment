import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
  providedIn: 'root',
})
export class EducationalQualificationUpdateRepository extends ResourceService {
  constructor(http: HttpClient) {
    super(http);
  }
  getResourceUrl(): string {
    return '/educational-qualification';
  }
  update(id:number,resource:any){
    return this.http.put(`${this.APIUrl}/${id}`, this.toServerModel(resource)).pipe(
      catchError((err) => {
        throw new Error(err.message);
      })
      );
  }
  override toServerModel(entity: any): any {
  return {
    id:entity.id,
    educationalLevel: { id: entity.educationalLevel.id },
    request:entity.request.id,
    academicYear: {
      id: entity.academicYear.id
    },
    schoolName:entity.schoolName,
    coursesName:entity.coursesName,
  };
}

}
