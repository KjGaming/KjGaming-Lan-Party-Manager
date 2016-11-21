import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'clan',
    styles: [require('./clan.scss')],
    template: require('./clan.component.html')
})


export class ClanComponent {

    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };


}
