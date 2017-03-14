import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "angular2-notifications";
import {BaRoutingService} from "../../../../theme/services/baRouting/baRouting.service";

@Component({
    selector: 'admin-sides',
    styles: [require('./sides.scss')],
    template: require('./sides.component.html'),
})
export class AdminSidesComponent implements OnInit {
    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };
    sides = [];
    sideName;

    constructor( private _toastService: NotificationsService, private _routingService: BaRoutingService) {
    }

    ngOnInit(){
        this.getSides();
    }

    getSides(){
        this._routingService.getSides().subscribe(
            data => {
               this.sides = data.obj;
            }
        );
    }

    switchSave(event, id) {
        let data = {
            id: id,
            lock: event
        };

        console.log(data);
        this._routingService.changeLock(data).subscribe(
            data => {
                this._toastService.success(data.title,data.message);
                console.log(data);
                this.ngOnInit();

            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done update Sides')
        );
    }

    createSide(){
        let data = {
            name: this.sideName,
            lock: true,
        };
        console.log(data);

        this._routingService.createSides(data).subscribe(
            data => {
                this._toastService.success(data.title, data.message);
                console.log(data);
                this.ngOnInit()
            }

        )
    }

}
