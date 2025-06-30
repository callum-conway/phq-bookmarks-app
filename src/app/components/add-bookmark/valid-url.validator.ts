import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validUrlCheck(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        const isValidWebUrl = (url:string) => {
            let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
            return regEx.test(url);
        }

        if (!isValidWebUrl(value)) {
            return { invalidUrl: true };
        }
        return null;
    }
}