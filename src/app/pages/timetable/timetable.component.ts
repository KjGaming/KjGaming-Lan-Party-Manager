import { Component, OnInit } from '@angular/core';
import { TimetableService } from "./timetable.service";
import { User } from "../../theme/model";


@Component({
    selector: 'timetable',
    styles: [require('./timetable.scss')],
    template: require('./timetable.component.html')
})


export class TimetableComponent implements OnInit {
    public users: User[];


    constructor(private _memberService: TimetableService) {
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
