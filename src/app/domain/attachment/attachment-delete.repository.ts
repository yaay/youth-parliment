import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
    providedIn: 'root'
})

export class AttachmentDeleteRepository extends ResourceService {
  getResourceUrl(): string {
    return '/request-attachment';
  }

}
