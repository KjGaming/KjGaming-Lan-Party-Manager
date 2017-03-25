import { Component, OnInit } from '@angular/core';
import {BaServerService} from "../../theme/services/baServer/baServer.service";


@Component({
    selector: 'download',
    styles: [require('./download.scss')],
    template: require('./download.component.html')
})


export class DownloadComponent implements OnInit {
    public downloads;


    constructor(private _serverService: BaServerService) {
    }

    ngOnInit() {
        this.getDownloads();
    }


    getDownloads() {
        this._serverService.get().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.downloads = data.obj;
            },
            // the second argument is a function which runs on error
            err => console.error(err)
        );
    }
}
