import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "angular2-notifications";
import {KjgServerService} from "../../../../theme/services/kjgServer/kjgServer.service";

@Component({
    selector: 'admin-news',
    styles: [require('./download.scss')],
    template: require('./download.component.html'),
})
export class AdminDownloadComponent implements OnInit {
    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    constructor(protected _downloadService: KjgServerService, private _toastService: NotificationsService) {
    }

    downloads: any[] = [];

    createTitle: string = '';
    createContent: string = '';
    createPath: string = '';

    id: string = '';
    editTitle: string = '';
    editContent: string = '';
    editPath: string = '';

    ngOnInit() {
        this.getDownload();
    }

    onChange() {
        for (let download of this.downloads) {
            if (download._id == this.id) {
                this.editTitle = download.title;
                this.editContent = download.content;
                this.editPath = download.download.path;
            }
        }
    }

    getDownload() {
        this._downloadService.get().subscribe(
            // the first argument is a function which runs on success
            data => {
                let keyNumber = 0;
                for (let key in data.obj) {
                    if (data.obj[key].download) {
                        this.downloads[keyNumber] = data.obj[key];
                        keyNumber++;
                    }
                }
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading downloads')
        );
    }

    createDonwload() {
        const data = {
            title: this.createTitle,
            content: this.createContent,
            path: this.createPath
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
