import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AttachmentRepository extends ResourceService {
  Url = environment.apiUrl +  '/request'

  getResourceUrl(): string {
    return '/request-attachment';
  }

  addAttachment(requestId: any,resource:any): Observable<any> {
    return this.http
      .post(this.Url +`/${requestId}` + this.getResourceUrl(),resource)
      .pipe(catchError((err) => {
        throw new Error('Error', err.message)
    }))
  }
  getAttachment(requestId: any):Observable<any>{
    return this.http
    .get(this.Url+ `/${requestId}` +this.getResourceUrl()).pipe(catchError((err) => {
      throw new Error('Error', err.message)
    }))
  }
  updateAttachment(id: number,resource:any): Observable<any> {
    return this.http.put(`${this.APIUrl}/${id}`, this.toServerModel(resource)).pipe(
      catchError((err) => {
        throw new Error(err.message);
      })
      );
    }
}
