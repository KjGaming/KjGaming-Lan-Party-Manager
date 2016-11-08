import { Component, OnInit } from '@angular/core';
import { CateringService } from "./catering.service";
import { User } from "../../theme/model";


@Component({
    selector: 'catering',
    styles: [require('./catering.scss')],
    template: require('./catering.component.html')
})


export class CateringComponent implements OnInit {
    public users: User[];


    constructor(private _memberService: CateringService) {
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
