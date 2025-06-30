import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom form validator function 
 * to check if a given URL is correctly formatted.
 * @returns null if the URL is valid, or an error object if invalid.
 */
export function validUrlCheck(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    const isValidWebUrl = (url: string): boolean => {
      let regEx: RegExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
      return regEx.test(url);
    }

    if (!isValidWebUrl(value)) {
      return { invalidUrl: true };
    }

    return null;
  }
}