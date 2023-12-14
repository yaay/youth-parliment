import { Injectable } from "@angular/core";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
    providedIn: 'root'
})

export class AffiliatePartyRepository extends ResourceService {
    getResourceUrl(): string {
        return 'affiliate-party?page=0&size=200'
    }   
}