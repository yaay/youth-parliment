import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";
import { BasicInformation } from "./models/basic-information";
import { Response } from "src/app/core/models/response";

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

    getBasicInformation(id: number): Observable<BasicInformation> {
        return this.http
            .get<BasicInformation>(this.APIUrl + `/${id}` + '/basic-information')
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