import {Component, ViewEncapsulation, OnInit, Input} from '@angular/core';
import {BaClanService} from "../../../../theme/services/baClan/baClan.service";

@Component({
    selector: 'clan-show',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./showclan.scss')],
    template: require('./showclan.component.html')
})
export class ShowClanComponent implements OnInit{
    clanlist: any;

    constructor(private _clanService: BaClanService) {}

    ngOnInit() {
        this.getClan();
        this._clanService.newData.subscribe(
            data => this.clanlist = data
        )
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
