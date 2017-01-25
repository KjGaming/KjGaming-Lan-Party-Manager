import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "angular2-notifications";
import {KjgServerService} from "../../../../theme/services/kjgServer/kjgServer.service";

@Component({
    selector: 'admin-download',
    styles: [require('./product.scss')],
    template: require('./product.component.html'),
})
export class AdminProductComponent implements OnInit {
    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    constructor(protected _downloadService: KjgServerService, private _toastService: NotificationsService) {
    }

    products;

    createName;
    createPrice;
    createNumber;
    createInfo;

    id: string = '';
    editTitle: string = '';
    editContent: string = '';
    editPath: string = '';

    ngOnInit() {
        this.getDownload();
    }

    onChange() {

    }

    getDownload() {

    }

    createDonwload() {
        const data = {

        };

        this._downloadService.create(data).subscribe(
            // the first argument is a function which runs on success
            data => {
                this._toastService.success(data.title, data.message);
                this.ngOnInit();
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done create download')
        );
    }

    updateDonwload() {
        const data = {
            id: this.id,
            title: this.editTitle,
            content: this.editContent,
            path: this.editPath
        };

        this._downloadService.change(data).subscribe(
            // the first argument is a function which runs on success
            data => {
                this._toastService.success(data.title, data.message);
                this.ngOnInit();
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done change download')
        );
    }

    delDonwload() {
        const data = {
            id: this.id,
        };
        this._downloadService.del(data).subscribe(
            // the first argument is a function which runs on success
            data => {
                this._toastService.success(data.title, data.message);
                this.ngOnInit();
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done delete download')
        );
    }

}
