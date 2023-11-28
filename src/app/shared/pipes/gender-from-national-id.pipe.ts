import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderFromNationalId'
})
export class GenderFromNationalIdPipe implements PipeTransform {

  transform(value: string): string {
      if (value.length != 14) {
        return ''
      }
      
      const genderCode = parseInt(value[12])
      if (genderCode % 2 == 0) {
        return 'female'
      } else {
        return 'male'
      }
  }

}
