import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';

import { EditClanService } from './editclan.service';
import { NotificationsService } from "angular2-notifications/src/notifications.service";
import { FormBuilder, FormGroup, AbstractControl, Validators } from "@angular/forms";
import { ClanService } from "../../clan.service";
import { BaThemeConfigProvider } from "../../../../theme/theme.configProvider";
import {BaClanService} from "../../../../theme/services/baClan/baClan.service";

@Component({
    selector: 'clan-edit',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./editclan.scss')],
    template: require('./editclan.component.html')
})
export class EditClanComponent implements OnInit {

    public clanListDate;
    public clanListUser: Array<any> = [];
    public newClanText: string = '';

    showClanName = 'Clanname';
    showClanShortName = 'Clan Kürzel';
    editClan = 0; // 2 => ClanAdmin, 1 => ClanUser, 0 => NoClan

    public form: FormGroup;
    public clanName: AbstractControl;
    public clanShortName: AbstractControl;
    public password: AbstractControl;
    public clanId: AbstractControl;
    public submitType: AbstractControl;

    public submitted: boolean = false;

    constructor(fb: FormBuilder,
                private _toastService: NotificationsService,
                private _clanService: BaClanService) {


        this.form = fb.group({
            'clanName': '',
            'clanShortName': '',
            'clanId': ['', Validators.required],
            'password': ''
        });

        this.clanName = this.form.controls['clanName'];
        this.clanShortName = this.form.controls['clanShortName'];
        this.clanId = this.form.controls['clanId'];
        this.password = this.form.controls['password'];
    }

    onSubmit(values: Object): void {

        if (this.form.valid) {

            if (this.editClan == 2) {
                const clan = ({
                    clanId: values['clanId'],
                    name: values['clanName'],
                    shortName: values['clanShortName'],
                    password: values['password']
                });

                this._clanService.editClan(clan)
                    .subscribe(
                        data => {
                            this._toastService.success(data.message, '');
                            this.pushData();
                        },
                        error => {
                            console.error(error);
                            this._toastService.error(error.title, error.error.message);

                        }
                    );

            } else if (this.editClan == 1) {
                const clan = ({
                    clanId: values['clanId']
                });

                this._clanService.clanOut(clan)
                    .subscribe(
                        data => {
                            this._toastService.success(data.message, '');
                            this.pushData();
                        },
                        error => {
                            console.error(error);
                            this._toastService.error(error.title, error.error.message);

                        }
                    );

            } else {
                const clan = ({
                    clanId: values['clanId'],
                    password: values['password']
                });

                this._clanService.clanIn(clan)
                    .subscribe(
                        data => {
                            this._toastService.success(data.message, '');
                            this.pushData();
                        },
                        error => {
                            console.error(error);
                            this._toastService.error(error.title, error.error.message);

                        }
                    );
            }
        }
    }

    pushData(){
        this._clanService.getClanList().subscribe(
            data=> this._clanService.newClanList(data.obj)
        );
    }

    ngOnInit() {
        this.getClanList();
        this._clanService.newData.subscribe(
            data => this.clanListDate = data
        )
    }

    getClanList() {

        this._clanService.getClanList().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.clanListDate = data.obj;

            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }

    deleteClan(clanId) {
        const clan = ({
            clanId: clanId._value
        });

        this._clanService.clanDel(clan)
            .subscribe(
                data => {
                    this.getClanList();
                    this._toastService.success(data.message, '');
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

    //Look if User in clan or not. Also look if he is Admin or not
    getClanValue(clanValue) {
        var userId = localStorage.getItem('userId');

        for (let clan of this.clanListDate) {
            //Look if ClanId equal to choosen ClanId
            if (clan._id == clanValue) {
                this.showClanName = clan.name;
                this.showClanShortName = clan.shortName;

                this.clanListUser = [];
                for (let user of clan.user) {
                    this.clanListUser.push({
                        nickName: user.nickName,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    });
                }

                //If User in this clan
                for (let user of clan.user) {
                    if (userId == user._id) {

                        if (userId == clan.admin._id) {
                            this.editClan = 2;

                            break;
                        }
                        this.editClan = 1;
                        break;
                    } else {
                        this.editClan = 0;
                    }
                }
            }
        }
    }


}
