import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { SmartTablesService } from './smartTables.service';
import { TournamentService } from "../../tournament.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'bracket-16',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./b16.scss')],
    template: require('./b16.component.html')
})
export class B16Component implements OnInit {
    public games = [];
    public row1 = [];
    public row2 = [];
    public row3 = [];
    public row4 = [];
    repeat4 = [1,2,3,4];
    tournamentId;
    private sub: any;

    //Variable for input the Value
    userStatus = localStorage.getItem('blackWidow');
    gameGameId;
    gameTeam1;
    gameTeam2;
    gameResult1;
    gameResult2;
    gameTimeStart;
    gameTimeDuration;
    gameMap;
    players1 = ['genin', 'SciTe', 'gabba', 'ata', 'bot'];
    players2 = ['genin', 'SciTe', 'gabba', 'ata', 'bot'];
    inGamen;

    public resultForm: FormGroup;



    constructor(private _tournamentService: TournamentService, private route: ActivatedRoute, public fb: FormBuilder) {
        this.sub = this.route.params.subscribe(params => {
            this.tournamentId = params['tournamentId'];
        });

        this.resultForm = this.fb.group({
            result1: ["", Validators.required],
            result2: ["", Validators.required]
        });

    }

    ngOnInit() {
        this.getTournament(this.tournamentId);
    }


    getTournament(id) {
        this._tournamentService.getTournamentInfos(id).subscribe(
            // the first argument is a function which runs on success
            data => {
                this.games = data.obj.games;
                for(let game of this.games){
                    if(game.gameId <= 8){
                        this.row1.push(game);
                    }else if(game.gameId <= 12 && game.gameId >= 9) {
                        this.row2.push(game);
                    }else if(game.gameId == 13 || game.gameId == 14) {
                        this.row3.push(game);
                    }else if(game.gameId == 15 || game.gameId == 16) {
                        this.row4.push(game);
                    }
                }

                if(data.obj.playerMode == "Clan"){

                }else{

                }

                console.log(this.games);
                console.log(this.row1);

            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }


    clickIt(game) {
        this.gameGameId = game.gameId;
        this.gameTeam1 = game.team1;
        this.gameTeam2 = game.team2;
        this.gameResult1 = game.result1;
        this.gameResult2 = game.result2;
        this.gameTimeStart = game.timeStart;
        this.gameTimeDuration = game.timeDuration;
        this.gameMap = game.map;

        var clans = JSON.parse(localStorage.getItem('clans'));

        // look if user in this Game
        for(let clan of clans){
            console.log(clan);
        }
    }

    saveResult(event){
        event['gameId'] =  this.gameGameId;
        event['tournamentId'] =  this.tournamentId;

        console.log(event);
    }

}
