import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {SmartTablesService} from './smartTables.service';
import {TournamentService} from "../../tournament.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'bracket-16',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./b16.scss')],
    template: require('./b16.component.html')
})
export class B16Component implements OnInit {
    public bracket = {
        "row1" : 8,
        "row2" : 4,
        "row3" : 3
    }
    public games;
    gameId;
    private sub: any;


    constructor(private _tournamentService: TournamentService, private route: ActivatedRoute) {
        this.sub = this.route.params.subscribe(params => {
            this.gameId = params['tournamentId'];
        });
    }

    ngOnInit() {
        this.getTournament(this.gameId);
    }


    getTournament(id) {
        this._tournamentService.getTournamentInfos(id).subscribe(
            // the first argument is a function which runs on success
            data => {
                this.games = data.obj.games;
                console.log(this.games);

            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }

}
