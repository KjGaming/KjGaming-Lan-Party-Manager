import { AbstractControl } from '@angular/forms';

export class DateValidator {

    public static validate(c: AbstractControl) {
        if(!c.value){
            return {
                validateDate: {
                    valid: false
                }
            }
        }
        if (2017 - c.value.date.year >= 16) {
            return null;

        } else if (2017 - c.value.date.year == 15 && c.value.date.month <= 4 && c.value.date.day <= 20) {
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