import { Component, OnInit } from '@angular/core';
import { User } from "../../theme/model";


@Component({
    selector: 'timetable',
    styles: [require('./clan.scss')],
    template: require('./clan.component.html')
})


export class ClanComponent {
    public users: User[];

    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

}
