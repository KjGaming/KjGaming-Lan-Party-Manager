import { Validators, FormGroup } from '@angular/forms';

export class CheckboxValidator {

    public static checkboxRequired(group: FormGroup) {
        var valid = false;
        var name: any;

        for (name in group.controls) {
            var check = Validators.required(group.controls[name]);
            if (!check) {
                valid = true;
                break;
            }
        }

        if (valid) {
            return null;
        }

        return {
            checkboxRequired: true
        };
    }
}
