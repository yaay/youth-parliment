import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
  providedIn: 'root',
})
export class LanguageLevelRepository extends ResourceService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'language-level';
  }
}
