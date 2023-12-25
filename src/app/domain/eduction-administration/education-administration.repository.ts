import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";
import { apiConfig } from "src/apiConfig";
import { EducationAdministration } from "./model/eduction-administration";
import { Response } from "src/app/core/models/response";


@Injectable({
    providedIn: 'root'
})

export class EducationAdministrationRepository extends ResourceService {
    constructor(http: HttpClient) {
        super(http)
    }

    getResourceUrl(): string {
        return 'governorate'
    }

    getEducationsAdministration(governorateId: any): Observable<Response<EducationAdministration>> {
        return this.http
            .get<Response<EducationAdministration>>(this.APIUrl + `/${governorateId}` + '/eduction-administration', { params: apiConfig.queryParams })
            .pipe(catchError((err) => {
                throw new Error('Error', err.message)
            }))
    }
}