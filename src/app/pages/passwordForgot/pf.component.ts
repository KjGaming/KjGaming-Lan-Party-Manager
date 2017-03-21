import {Component, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {NotificationsService} from "angular2-notifications/src/notifications.service";
import {EmailValidator} from "../../theme/validators/email.validator";
import {BaAuthService} from "../../theme/services/baAuth/baAuth.service";
import {EqualPasswordsValidator} from "../../theme/validators/equalPasswords.validator";
import {Subscription} from "../../../../node_modules/rxjs/Subscription";
import {Router} from "../../../../node_modules/@angular/router/src/router";

@Component({
    selector: 'pf',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./pf.scss')],
    template: require('./pf.component.html'),
})
export class PasswordForgotComponent implements OnInit, OnDestroy {
    token: String = '';
    private subscription: Subscription;

    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    public form: FormGroup;
    public email: AbstractControl;


    public pReset: FormGroup;
    public passwords: FormGroup;
    public password: AbstractControl;
    public repeatPassword: AbstractControl;
    public pin: AbstractControl;

    constructor(private _toastService: NotificationsService,
                private fb: FormBuilder,
                private _authService: BaAuthService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }


    ngOnInit() {

        this.subscription = this.activatedRoute.queryParams.subscribe(
            (params: Params) => {
                this.token = params['token'];
            });

        this.pReset = this.fb.group({
            'pin': ['', Validators.compose([Validators.required])],
            'passwords': this.fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
            }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
        });
        this.passwords = <FormGroup> this.pReset.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];
        this.pin = this.pReset.controls['pin'];

        this.form = this.fb.group({
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])]
        });
        this.email = this.form.controls['email'];

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onReset(form) {
        let data = {
            token: this.token,
            pin: form.pin,
            password: form.passwords.password
        };

        this._authService.setNewPassword(data).subscribe(
            data => {
                this.router.navigate(['confirmReg'], {queryParams: {'choose':'change'}});
            },
            error => {
                this._toastService.error(error.title, error.error.message);
                console.error(error);
            }
        );
    }

    onSubmit(form) {
        this._authService.forgotPassword(form).subscribe(
            data => {
                this.router.navigate(['confirmReg'], {queryParams: {'choose':'send'}});
            },
            error => {
                this._toastService.error(error.title, error.error.message);
                console.error(error);
            }
        );

    }


}
