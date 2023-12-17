import { Injectable } from "@angular/core";
import { apiConfig } from "src/apiConfig";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
    providedIn: 'root'
})

export class AffiliatePartyRepository extends ResourceService {
    getResourceUrl(): string {
        const { page, size } = apiConfig.queryParams;
        return `affiliate-party?page=${page}&size=${size}`;
    }   
}