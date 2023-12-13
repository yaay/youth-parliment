import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";

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
  getAcademicYear(eduLvlId: any): Observable<any> {
    return this.http
      .get(this.APIUrl +`/${eduLvlId}` + '/academic-year')
      .pipe(catchError((err) => {
            throw new Error('Error', err.message)
        }))
}
}
