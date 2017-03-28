import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {BaAuthService} from "../../theme/services";
import {User} from "../../theme/model";
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications/src/notifications.service";

@Component({
    selector: 'login',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./login.scss')],
    template: require('./login.html'),
})
export class Login {

    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;

    constructor(fb: FormBuilder, private authService: BaAuthService, private router: Router, private _toastService: NotificationsService) {
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    public onSubmit(values: Object): void {
        this.submitted = true;

        if (this.form.valid) {
            const user = new User(
                values['email'],
                values['password'],
            );
            const expireDate: any = Date.now() + (2 * 60 * 60 * 1000);

            this.authService.signin(user)
                .subscribe(
                    data => {
                        localStorage.setItem('id_token', data.id_token);
                        localStorage.setItem('expireDate', expireDate);
                        localStorage.setItem('userId', data.userId);
                        localStorage.setItem('nickName', data.nickName);
                        localStorage.setItem('blackWidow', data.blackWidow);
                        localStorage.setItem('clans', JSON.stringify(data.clan));
                        this.router.navigateByUrl('/');
                    },
                    error => {
                        console.error(error);
                        this._toastService.error(error.title, error.error.message);

                    }
                );
        }
    }
}
