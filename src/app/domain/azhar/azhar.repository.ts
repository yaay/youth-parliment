import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
    providedIn: 'root'
})

export class AzharRepository extends ResourceService {
    constructor(http: HttpClient) {
        super(http)
    }

    getResourceUrl(): string {
        return 'governorate'
    }


    getAzhar(governorateId: number): Observable<any> {
        return this.http
            .get(this.APIUrl + `/${governorateId}` + '/azhar?page=0&size=200')
            .pipe(catchError((err) => {
                throw new Error('Error', err.message)
            }))
    }
}