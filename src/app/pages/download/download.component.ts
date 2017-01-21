import { Component, OnInit } from '@angular/core';
import {KjgServerService} from "../../theme/services/kjgServer/kjgServer.service";


@Component({
    selector: 'download',
    styles: [require('./download.scss')],
    template: require('./download.component.html')
})


export class DownloadComponent implements OnInit {
    public downloads;


    constructor(private _serverService: KjgServerService) {
    }

    ngOnInit() {
        this.getDownloads();
    }


    getDownloads() {
        this._serverService.get().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.downloads = data.obj;
                console.log(this.downloads);
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }
}
