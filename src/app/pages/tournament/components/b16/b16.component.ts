import {Component, ViewEncapsulation} from '@angular/core';

import { SmartTablesService } from './smartTables.service';

@Component({
    selector: 'bracket-16',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./b16.scss')],
    template: require('./b16.component.html')
})
export class B16Component {
    public game = {
        game1:{
            team1: 'Rip in Peace',
            team2: 'Orga',
            resultT1: '16',
            resultT2: '5'
        },
        game2:{
            team1: 'NIP',
            team2: 'VP',
            resultT1: '16',
            resultT2: '14'
        }
    };

}
