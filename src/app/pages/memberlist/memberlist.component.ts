import { Component, OnInit } from '@angular/core';
import { User } from "../../theme/model";
import {BaUserService} from "../../theme/services/baUser/baUser.service";


@Component({
    selector: 'memberlist',
    styles: [require('./memberlist.scss')],
    template: require('./memberlist.component.html')
})


export class MemberlistComponent implements OnInit {
    public users: User[];


    constructor(private _memberService: BaUserService) {
    }

    ngOnInit() {
        this.getMember();
    }


    getMember() {
        this._memberService.getMinimalUserMemberlist().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.users = data.obj;
            },
            // the second argument is a function which runs on error
            err => console.error(err)
        );
    }
}
