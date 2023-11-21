import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResourceService } from "src/app/core/services/resource.service";

@Injectable({
    providedIn: 'root'
})

export class ResetPasswordRepository extends ResourceService {
  constructor( private httpClient: HttpClient ) {
      super(httpClient);
  }

    getResourceUrl(): string {
        return 'token/reset?email='
    }

    resetPassword(email: string) {
        return this.httpClient.get(`${this.APIUrl}${email}`)
    }
}