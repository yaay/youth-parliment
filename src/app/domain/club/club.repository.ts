import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";
import { apiConfig } from "src/apiConfig";
import { Club } from "./models/club";
import { Response } from "src/app/core/models/response";


@Injectable({
    providedIn: 'root'
})

export class ClubRepository extends ResourceService {
    constructor(http: HttpClient) {
        super(http)
    }

    getResourceUrl(): string {
        return 'governorate'
    }

    getClubs(governorateId: number): Observable<Response<Club>> {
        return this.http
            .get<Response<Club>>(this.APIUrl + `/${governorateId}/club`, { params: apiConfig.queryParams })
            .pipe(catchError((err) => {
                throw new Error('Error', err.message)
            }))
    }
}