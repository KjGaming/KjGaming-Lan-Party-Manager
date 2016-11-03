import { Component, OnInit } from '@angular/core';
import { MemberlistService } from "./memberlist.service";
import { User } from "../../theme/model";


@Component({
    selector: 'memberlist',
    styles: [require('./memberlist.scss')],
    template: require('./memberlist.component.html')
})


export class MemberlistComponent implements OnInit {
    public users: User[];


    constructor(private _memberService: MemberlistService) {
    }

    ngOnInit() {
        this.getMember();
    }


    getMember() {
        this._memberService.getNews().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.users = data.obj;
                console.log(this.users);
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }
}
