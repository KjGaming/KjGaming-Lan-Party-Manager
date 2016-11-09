import { Component, OnInit } from '@angular/core';
import { User } from "../../theme/model";


@Component({
    selector: 'feedback',
    styles: [require('./feedback.scss')],
    template: require('./feedback.component.html')
})


export class FeedbackComponent implements OnInit {
    public users: User[];


    constructor() {
    }

    ngOnInit() {

    }



}
