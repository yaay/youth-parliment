import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";
import { apiConfig } from "src/apiConfig";

@Injectable({
    providedIn: 'root'
})

export class YouthCenterRepository extends ResourceService {
    constructor(http: HttpClient) {
        super(http)
    }

    getResourceUrl(): string {
        return 'district'
    }

    getYouthCenter(districtId: any): Observable<any> {
        return this.http
            .get(this.APIUrl + `/${districtId}` + '/youth-centre', { params: apiConfig.queryParams })
            .pipe(catchError((err) => {
                throw new Error('Error', err.message)
            }))
    }
}