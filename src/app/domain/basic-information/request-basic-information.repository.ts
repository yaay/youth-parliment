import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { ExtractIdService } from "src/app/core/services/extractIds.service";
import { ResourceService } from "src/app/core/services/resource.service";
import { BasicInformation } from "./models/basic-information";

@Injectable({
    providedIn: 'root'
})

export class RequestBasicInformationRepository extends ResourceService {
    constructor(http: HttpClient) {
        super(http)
    }

    

    getResourceUrl(): string {
        return 'request'
    }

    getBasicInformation(id: number): Observable<any> {
        return this.http
            .get(this.APIUrl + `/${id}` + '/basic-information')
            .pipe(catchError((err) => {
                throw new Error('Error', err.message)
            }))
    }

    addBasicInformation(id: number, resource: BasicInformation): Observable<any> {
        return this.http
            .post(this.APIUrl + `/${id}` + '/basic-information', resource)
            .pipe(catchError((err) => {
                throw new Error('Error', err.message)
            }))
    }
}