import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";
import { AcademicYear } from "./models/academic-year";
import { Response } from "src/app/core/models/response";
@Injectable({
  providedIn: 'root',
})
export class AcademicYearRepository extends ResourceService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'educational-level';
  }
  getAcademicYear(eduLvlId: number): Observable<Response<AcademicYear>> {
    return this.http
      .get<Response<AcademicYear>>(this.APIUrl +`/${eduLvlId}` + '/academic-year')
      .pipe(catchError((err) => {             throw new Error('Error', err.message)
    }))
}
}
