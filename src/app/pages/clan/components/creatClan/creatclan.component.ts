import {Component, ViewEncapsulation} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { CreatClanService } from './creatclan.service';
import { NotificationsService } from "angular2-notifications/src/notifications.service";
import { EqualPasswordsValidator } from "../../../../theme/validators/equalPasswords.validator";
import {BaClanService} from "../../../../theme/services/baClan/baClan.service";

@Component({
    selector: 'clan-creat',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./creatclan.scss')],
    template: require('./creatclan.component.html'),
})
export class CreatClanComponent {

    public form: FormGroup;
    public clanName: AbstractControl;
    public clanShortName: AbstractControl;
    public password: AbstractControl;
    public repeatPassword: AbstractControl;
    public passwords: FormGroup;
    public submitted: boolean = false;

    constructor(fb: FormBuilder, private _toastService: NotificationsService, private _clanService: BaClanService) {
        this.form = fb.group({
            'clanName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'clanShortName': ['', Validators.required],
            'passwords': fb.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
                'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
            }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
        });

        this.clanName = this.form.controls['clanName'];
        this.clanShortName = this.form.controls['clanShortName'];
        this.passwords = <FormGroup> this.form.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];
    }

    onSubmit(values: Object): void {
        this.submitted = true;

        if (this.form.valid) {
            const clan = ({
                name: values['clanName'],
                shortName: values['clanShortName'],
                password: values['passwords']['password'],
                admin: localStorage.getItem('userId')
            });

            this._clanService.creatClan(clan)
                .subscribe(
                    data => {
                        this._toastService.success(data.title, data.message);
                        let clans = JSON.parse(localStorage.getItem('clans'));
                        clans.push(data.clan);
                        localStorage.setItem('clans', JSON.stringify(clans));
                        this._clanService.getClanList().subscribe(
                            data=> this._clanService.newClanList(data.obj)
                        );
                    },
                    error => {
                        console.error(error);
                        this._toastService.error(error.title, error.error.message);

                    }
                );

        }
    }

}
