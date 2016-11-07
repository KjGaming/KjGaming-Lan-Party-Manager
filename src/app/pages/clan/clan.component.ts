import { Component, OnInit } from '@angular/core';
import { ClanService } from "./clan.service";
import { User } from "../../theme/model";


@Component({
    selector: 'timetable',
    styles: [require('./clan.scss')],
    template: require('./clan.component.html')
})


export class ClanComponent implements OnInit {
    public users: User[];


    constructor(private _memberService: ClanService) {
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
