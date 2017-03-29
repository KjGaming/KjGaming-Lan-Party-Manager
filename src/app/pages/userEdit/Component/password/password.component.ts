import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {EqualPasswordsValidator} from "../../../../theme/validators/equalPasswords.validator";
import {BaUserService} from "../../../../theme/services/baUser/baUser.service";
import {NotificationsService} from "../../../../../../node_modules/angular2-notifications/src/notifications.service";


@Component({
    selector: 'userEditPassword',
    styles: [require('./password.scss')],
    template: require('./password.component.html')
})


export class PasswordUserEditComponent implements OnInit {

    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    passwordForm: FormGroup;
    passwords: FormGroup;

    constructor(private fb: FormBuilder,
                private _userService: BaUserService,
                private _toastService: NotificationsService) {
    }

    ngOnInit() {
        this.passwordForm = this.fb.group({
            'passwords': this.fb.group({
                'password': this.fb.control('', Validators.compose([Validators.required, Validators.minLength(4)])),
                'repeatPass': this.fb.control('', Validators.compose([Validators.required, Validators.minLength(4)]))
            }, {validator: EqualPasswordsValidator.validate('password', 'repeatPass')})
        });
    }

    onSubmit() {
        let data = {
            "type": 'cPassword',
            "password": this.passwordForm.value.passwords.password
        };

        this._userService.setUserInformation(data)
            .subscribe(
                data => {
                    this._toastService.success(data.title, data.message);
                },
                error => {
                    this._toastService.error(error.title, error.error.message);
                    console.error(error);
                }
            )
    }


}
