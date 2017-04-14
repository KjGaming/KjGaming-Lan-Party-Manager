import {Component, OnInit} from '@angular/core';
import { BaUserService } from "app/theme/services/baUser";


@Component({
    selector: 'userEditPin',
    styles: [require('./uPin.scss')],
    template: require('./uPin.component.html')
})

export class PinUserEditComponent implements OnInit {

    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    userKey;

    constructor(private _userService: BaUserService) {
    }

    ngOnInit() {
    	this._userService.getUserPin().subscribe(
    		data => {
    			this.userKey = data.obj;
			}
		);
    }

	setPin(){
		this._userService.setUserPin().subscribe(
			data => {
				this.ngOnInit();
			}
		);
	}

}
