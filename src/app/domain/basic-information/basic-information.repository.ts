import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { ExtractIdService } from "src/app/core/services/extractIds.service";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
    providedIn: 'root'
})

export class BasicInformationRepository extends ResourceService {
    constructor(http: HttpClient) {
        super(http)
    }

    getResourceUrl(): string {
        return 'basic-information'
    }
}