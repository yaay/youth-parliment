import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { ExtractIdService } from "src/app/core/services/extractIds.service";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
    providedIn: 'root'
})

export class RequestBasicInformationRepository extends ResourceService {
    constructor(http: HttpClient, private extractIds: ExtractIdService) {
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

    addBasicInformation(id: number, resource: any): Observable<any> {
        let formattedResource = this.extractIds.extractIds(resource);
        formattedResource['birthDate'] = formattedResource.dob?.year + '-' + formattedResource.dob?.month + '-' + formattedResource.dob?.day;
        delete formattedResource.dob;
        formattedResource['request'] = {request: id};

        return this.http
            .post(this.APIUrl + `/${id}` + '/basic-information', formattedResource)
            .pipe(catchError((err) => {
                throw new Error('Error', err.message)
            }))
    }
}