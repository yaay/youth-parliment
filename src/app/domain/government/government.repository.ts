import { Injectable } from "@angular/core";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
    providedIn: 'root'
})

export class GovernmentRepository extends ResourceService {
    getResourceUrl(): string {
        return 'governorate?size=28'
    }

    
}