import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExtractIdService {
  extractIds(obj: any): any {
    const result = { ...obj };

    const extractNestedIds = (nestedObj: any) => {
      for (const key in nestedObj) {
        if (typeof nestedObj[key] === 'object' && nestedObj[key] !== null && 'id' in nestedObj[key]) {
          result[key] = { id: nestedObj[key].id };
          extractNestedIds(nestedObj[key]);
        }
      }
    };

    extractNestedIds(result);

    return result;
  }
}
