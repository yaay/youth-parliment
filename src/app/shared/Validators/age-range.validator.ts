import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ageRange(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const nationalId = control.value?.toString();

    if (!nationalId && nationalId?.length !== 14) {
      return null;
    }

    const year = 2000 + parseInt(nationalId.substring(1, 3), 10);
    const month = parseInt(nationalId.substring(3, 5), 10);
    const day = parseInt(nationalId.substring(5, 7), 10);

    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    
    if (age < 10 || age > 17) {
      return { ageRange: true };
    }

    return null;
  };
}
