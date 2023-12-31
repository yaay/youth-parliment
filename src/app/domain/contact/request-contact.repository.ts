import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";
import { Contact } from "./models/contact";

@Injectable({
    providedIn: 'root'
})

export class RequestContactRepository extends ResourceService {
  constructor(http: HttpClient) {
    super(http);
  }

  getResourceUrl(): string {
    return 'request';
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(this.APIUrl + `/${id}` + '/contact').pipe(
      catchError((err) => {
        throw new Error('Error', err.message);
      })
    );
  }

  addContact(id: number, resource: Contact): Observable<any> {
    return this.http.post(this.APIUrl + `/${id}` + '/contact', resource).pipe(
      catchError((err) => {
        throw new Error('Error', err.message);
      })
    );
  }
}