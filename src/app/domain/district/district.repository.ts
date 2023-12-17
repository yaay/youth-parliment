import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";
import { apiConfig } from "src/apiConfig";


@Injectable({
    providedIn: 'root'
})

export class DistrictRepository extends ResourceService {
    constructor(http: HttpClient) {
        super(http)
    }

    getResourceUrl(): string {
        return `governorate`
    }

    getDistricts(governorateId: any): Observable<any> {
        return this.http
           .get(this.APIUrl + `/${governorateId}` + '/district/', { params: apiConfig.queryParams })
           .pipe(catchError((err) => {
                throw new Error('Error', err.message)
            }))
    }
}