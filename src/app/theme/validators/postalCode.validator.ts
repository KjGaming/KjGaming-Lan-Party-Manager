import { AbstractControl } from '@angular/forms';

export class PostalCodeValidator {

    public static validate(c: AbstractControl) {
        let EMAIL_REGEXP = /^[0-9]{5}/i;

        return EMAIL_REGEXP.test(c.value) ? null : {
            validatePostalCode: {
                valid: false
            }
        };
    }
}