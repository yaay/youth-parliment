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

}