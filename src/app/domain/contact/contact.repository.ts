import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";
import { Contact } from "./models/contact";

@Injectable({
    providedIn: 'root'
})

export class ContactRepository extends ResourceService {
    constructor(http: HttpClient) {
        super(http)
    }

    getResourceUrl(): string {
        return 'contact'
    }

    update(id: number, resource: Contact): Observable<any> {
        return this.http
            .put(this.APIUrl + `/${id}`, resource)
            .pipe(catchError((err) => {
                throw new Error('Error', err.message)
            }))
    }


}