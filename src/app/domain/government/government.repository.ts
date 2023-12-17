import { Injectable } from "@angular/core";
import { apiConfig } from "src/apiConfig";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
    providedIn: 'root'
})

export class GovernmentRepository extends ResourceService {
    getResourceUrl(): string {
        const { size } = apiConfig.queryParams;
        return `governorate?size=${size}`;
    }

    
}