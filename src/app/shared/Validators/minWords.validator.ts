import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minWordsValidator(minWords: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // If the control is empty, consider it valid.
    }

    const words = control.value.split(/\s+/).filter((word: string) => word.length > 0);

    return words.length >= minWords ? null : { minWords: true };
  };
}
