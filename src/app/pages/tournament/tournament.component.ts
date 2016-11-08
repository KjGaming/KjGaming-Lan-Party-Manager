import { Component, OnInit } from '@angular/core';
import { TournamentService } from "./tournament.service";
import { User } from "../../theme/model";


@Component({
    selector: 'tournament',
    styles: [require('./tournament.scss')],
    template: require('./tournament.component.html')
})


export class TournamentComponent implements OnInit {
    public users: User[];


    constructor(private _memberService: TournamentService) {
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
