import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';

import { EditClanService } from './editclan.service';
import { NotificationsService } from "angular2-notifications/src/notifications.service";
import { FormBuilder, FormGroup, AbstractControl, Validators } from "@angular/forms";
import { ClanService } from "../../clan.service";
import { BaThemeConfigProvider } from "../../../../theme/theme.configProvider";

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
    public submitted: boolean = false;

    constructor(fb: FormBuilder,
                private _toastService: NotificationsService,
                private _editClanService: EditClanService,
                private _clanService: ClanService,
                private _baConfig: BaThemeConfigProvider) {


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

    public onSubmit(values: Object): void {
        this.submitted = true;

        if (this.form.valid) {
            const clan = ({
                name: values['clanName'],
                shortName: values['clanShortName'],
                password: values['passwords']['password'],
                admin: localStorage.getItem('userId')
            });

            this._clanService.editClan(clan)
                .subscribe(
                    data => {
                        this._toastService.success(data.message, '');
                    },
                    error => {
                        console.error(error);
                        this._toastService.error(error.title, error.error.message);

                    }
                );

        }
    }

    ngOnInit() {
        this.getClanList();
    }

    getClanList() {

        this._clanService.getClanList().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.clanListDate = data.obj;
                console.log(this.clanListDate);
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
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
                console.log(this.clanListUser);

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
        console.log(this.editClan);
    }


}
