import { Component, OnInit } from '@angular/core';
import { FeedbackService } from "./feedback.service";
import { User } from "../../theme/model";


@Component({
    selector: 'feedback',
    styles: [require('./feedback.scss')],
    template: require('./feedback.component.html')
})


export class FeedbackComponent implements OnInit {
    public users: User[];


    constructor(private _memberService: FeedbackService) {
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
