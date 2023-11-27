import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'birthDateFromNationalId'
})
export class BirthDateFromNationalIdPipe implements PipeTransform {

  transform(value: string): number[] {
    if (value.length !== 14) {
      return [];
    }

    const year = `20${value[1]}${value[2]}`;
    const month = value[3] === '0' ? value[4] : `${value[3]}${value[4]}`;
    const day = value[5] === '0' ? value[6] : `${value[5]}${value[6]}`;

    console.log(value)

    return [parseInt(year, 10), (parseInt(month, 10)-1), parseInt(day, 10)]

  }

}
