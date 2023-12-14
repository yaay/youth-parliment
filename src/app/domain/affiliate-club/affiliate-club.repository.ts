import { Injectable } from "@angular/core";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
    providedIn: 'root'
})

export class AffiliateClubRepository extends ResourceService {

    getResourceUrl(): string {
        return 'affiliate-club?page=0&size=200'
    }
}