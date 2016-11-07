import { Component, OnInit } from '@angular/core';
import { SeatingService } from "./seating.service";
import { User } from "../../theme/model";


@Component({
    selector: 'seating',
    styles: [require('./seating.scss')],
    template: require('./seating.component.html')
})


export class SeatingComponent implements OnInit {
    public users: User[];


    constructor(private _memberService: SeatingService) {
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
