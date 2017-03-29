import {Component, OnInit, Input} from '@angular/core';
import {BaUserService} from "../../../../theme/services/baUser/baUser.service";
import {OnChanges} from "../../../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks";


@Component({
    selector: 'userEditGames',
    styles: [require('./games.scss')],
    template: require('./games.component.html')
})


export class GamesUserEditComponent implements OnInit {
    @Input() games: String[];

    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    constructor(private _userService: BaUserService) {
    }

    ngOnInit() {

    }

    saveTags() {
        let data = {
            "type": 'cGames',
            "games": []
        };

        for(let g of this.games){
            data.games.push(g['value']);
        }

        this._userService.setUserInformation(data)
            .subscribe(
                data => {
                },
                error => {
                    console.error(error);
                }
            )
    }


}
