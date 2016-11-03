import { AbstractControl } from '@angular/forms';

export class DateValidator {

    public static validate(c: AbstractControl) {
        var data = c.value.split("-");

        if (2017 - data[0] >= 16) {
            return null;

        } else if (2017 - data[0] == 15 && data[1] <= 4 && data[2] <= 20) {
            return null;

        } else {
            return {
                validateDate: {
                    valid: false
                }
            }
        }
    }
}