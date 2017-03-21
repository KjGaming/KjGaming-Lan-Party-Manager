import {Component, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Router} from "@angular/router";
import {Subscription} from "../../../../node_modules/rxjs/Subscription";

@Component({
    selector: 'confirmReg',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./confirmReg.scss')],
    template: require('./confirmReg.component.html'),
})

export class confirmRegComponent implements OnInit, OnDestroy {
    units: number = 10;
    time: any;
    chooser = '';
    private subscription: Subscription ;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {

        this.time = setInterval(() => this.displayString(), 1000);
    }

    ngOnInit() {
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (params: Params) => {
                this.chooser = params['choose'];
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    displayString() {
        if (this.units == 0) {
            clearInterval(this.time);
            this.router.navigateByUrl('/');
        } else {
            this.units -= 1;
        }

    }

}
