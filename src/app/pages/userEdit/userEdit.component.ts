import {Component, OnInit} from '@angular/core';
import {BaUserService} from "../../theme/services/baUser/baUser.service";


@Component({
    selector: 'userEdit',
    styles: [require('./userEdit.scss')],
    template: require('./userEdit.component.html')
})


export class UserEditComponent implements OnInit {
    userdata = [];
    games = [];

    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    constructor(private _userService: BaUserService) {

    }

    ngOnInit() {
        this.getUserGames();
    }

    getUserGames() {
        this._userService.getUserInformation()
            .subscribe(
                data => {
                    console.log(data.obj);
                    this.userdata = data.obj;
                    this.games = [];
                    for (let game of data.obj.games) {
                        this.games.push({
                            display: game,
                            value: game,
                        })
                    }
                },
                error => {
                    console.error(error);

                }
            );
    }

    refresh(event){
        console.log(event);
        this.ngOnInit();
    }


}
