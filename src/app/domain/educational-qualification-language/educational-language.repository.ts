import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
  providedIn: 'root',
})
export class EducationalLanguageRepository extends ResourceService {
  constructor(http: HttpClient) {
    super(http);
  }
  getResourceUrl(): string {
    return '/educational-qualification-language';
  }

deleteLanguage(id:number): Observable<any>{
  return this.http.delete(`${this.APIUrl}/${id}`).pipe(
    catchError((err) => {
      throw new Error(err.message);
    })
  );
}

}
