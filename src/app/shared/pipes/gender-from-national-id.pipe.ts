import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderFromNationalId'
})
export class GenderFromNationalIdPipe implements PipeTransform {

  transform(value: string): boolean {
      if (value.length != 14) {
        return false
      }
      
      const genderCode = parseInt(value[12])
      if (genderCode % 2 == 0) {
        return true
      } else {
        return false
      }
  }

}
