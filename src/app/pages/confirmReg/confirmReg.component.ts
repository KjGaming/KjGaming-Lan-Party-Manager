import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";


@Component({
    selector: 'confirmReg',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./confirmReg.scss')],
    template: require('./confirmReg.component.html'),
})

export class confirmRegComponent {
    units: number = 10;
    time: any;

    constructor(private router: Router) {

        this.time = setInterval(()=>this.displayString(), 1000);
    }

    displayString() {
        if(this.units == 0){
            clearInterval(this.time);
            this.router.navigateByUrl('/');
        }else{
            this.units -= 1;
        }

    }

}
