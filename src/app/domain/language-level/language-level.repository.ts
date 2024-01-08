import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
  providedIn: 'root',
})
export class LanguageLevelRepository extends ResourceService {
  getResourceUrl(): string {
    return 'language-level';
}
}
