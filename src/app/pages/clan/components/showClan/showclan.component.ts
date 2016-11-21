import { Component, ViewEncapsulation } from '@angular/core';

import { ClanService } from "../../clan.service";

@Component({
    selector: 'clan-show',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./showclan.scss')],
    template: require('./showclan.component.html')
})
export class ShowClanComponent {
    public clanlist;


    constructor(private _clanService: ClanService) {}

    ngOnInit() {
        this.getClan();
    }


    getClan() {
        this._clanService.getClanList()
            .subscribe(
            // the first argument is a function which runs on success
            data => {
                this.clanlist = data.obj;
                console.log(this.clanlist);
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }

}
