import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
    providedIn: 'root'
})

export class AttachmentRepository extends ResourceService {
  getResourceUrl(): string {
    return '/request';
  }

  addAttachment(requestId: any,resource:any): Observable<any> {
    return this.http
      .post(this.APIUrl +`/${requestId}` + '/request-attachment',resource)
      .pipe(catchError((err) => {
        throw new Error('Error', err.message)
    }))
  }
}
