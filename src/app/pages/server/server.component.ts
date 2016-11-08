import { Component, OnInit } from '@angular/core';
import { ServerService } from "./server.service";
import { User } from "../../theme/model";


@Component({
    selector: 'server',
    styles: [require('./server.scss')],
    template: require('./server.component.html')
})


export class ServerComponent implements OnInit {
    public servers;
    serverIndex = 1;


    constructor(private _serverService: ServerService) {
    }

    ngOnInit() {
        this.getServer();
    }


    getServer() {
        this._serverService.getNews().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.servers = data.obj;
                console.log(this.servers);
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }
}
