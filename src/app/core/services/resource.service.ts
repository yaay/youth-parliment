import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService {

  APIUrl = environment.apiUrl + this.getResourceUrl()

  abstract getResourceUrl(): string;

  // options = { withCredentials: true };

  protected constructor(protected http: HttpClient) { }

  add(resource: any): Observable<any> {
    return this.http
      .post(this.APIUrl, resource, { observe: 'response' })
      .pipe(catchError((err) => {
        throw new Error('Error', err.message);
      }))
  };

  get(): Observable<any> {
    return this.http
      .get(this.APIUrl)
      .pipe(catchError((err) => {
        throw new Error('Error', err.message)
      }))

  }

  update(id: number, resource: any): Observable<any> {
    return this.http
      .put(this.APIUrl + `/${id}`, resource)
      .pipe(catchError((err) => {
        throw new Error('Error', err.message)
      }))
  }

  getList(p: {} = {}): Observable<any> {
    const params = new HttpParams({ fromObject: p });
    return this.http.get(`${this.APIUrl}?${params.toString()}`).pipe(
      map((list) => list),
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }
  delete(id:number): Observable<any>{
    return this.http.delete(`${this.APIUrl}/${id}`).pipe(
      catchError((err) => {
        throw new Error(err.message);
      })
    );
  }
  toServerModel(entity: any): any {
    return entity;
  }
}
