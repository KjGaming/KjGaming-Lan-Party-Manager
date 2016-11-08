import { Component, OnInit } from '@angular/core';
import { DownloadService } from "./download.service";
import { User } from "../../theme/model";


@Component({
    selector: 'download',
    styles: [require('./download.scss')],
    template: require('./download.component.html')
})


export class DownloadComponent implements OnInit {
    public downloads;


    constructor(private _memberService: DownloadService) {
    }

    ngOnInit() {
        this.getDownloads();
    }


    getDownloads() {
        this._memberService.getNews().subscribe(
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
