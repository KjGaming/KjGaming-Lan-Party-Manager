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
    public game;
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
                this.game = data.obj.games;
                console.log(this.game);


            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }

}
