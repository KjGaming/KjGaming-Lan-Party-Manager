import { Component, OnInit } from '@angular/core';
import {BaServerService} from "../../theme/services/baServer/baServer.service";


@Component({
    selector: 'server',
    styles: [require('./server.scss')],
    template: require('./server.component.html')
})


export class ServerComponent implements OnInit {
    public servers;
    serverIndex = 1;


    constructor(private _serverService: BaServerService) {
    }

    ngOnInit() {
        this.getServer();
    }


    getServer() {
        this._serverService.get().subscribe(
            // the first argument is a function which runs on success
            data => {
                this.servers = data.obj;
            },
            // the second argument is a function which runs on error
            err => console.error(err)
        );
    }

    isClassVisible(status){
        if(status == true){
            return 'bg-success';
        }else{
            return 'bg-danger';
        }
    }
}
