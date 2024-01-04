import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";
import { Contact } from "./models/contact";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class RequestContactRepository extends ResourceService {
  constructor(http: HttpClient) {
    super(http);
  }

  contactUrl: string = `${environment.apiUrl}/request/`

  getResourceUrl(): string {
    return 'contact';
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.contactUrl}${id}/contact`).pipe(
      catchError((err) => {
        throw new Error('Error', err.message);
      })
    );
  }

  addContact(id: number, resource: any): Observable<any> {
    return this.http.post(`${this.contactUrl}${id}/contact`, resource).pipe(
      catchError((err) => {
        throw new Error('Error', err.message);
      })
    );
  }
}