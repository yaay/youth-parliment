import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { ExtractIdService } from "src/app/core/services/extractIds.service";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
    providedIn: 'root'
})

export class BasicInformationRepository extends ResourceService {
    constructor(http: HttpClient, private extractIds: ExtractIdService) {
        super(http)
    }

    getResourceUrl(): string {
        return 'basic-information'
    }

    update(id: number, requestId: number, resource: any): Observable<any> {
        let formattedResource = this.extractIds.extractIds(resource);
        formattedResource['birthDate'] = formattedResource.dob?.year + '-' + formattedResource.dob?.month + '-' + formattedResource.dob?.day;
        delete formattedResource.dob;
        formattedResource['request'] = {request: requestId};
        formattedResource['id'] = id;

        return this.http
            .put(this.APIUrl + `/${id}`, formattedResource)
            .pipe(catchError((err) => {
                throw new Error('Error', err.message)
            }))
    }


}