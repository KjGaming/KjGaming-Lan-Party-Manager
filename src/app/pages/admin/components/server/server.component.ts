import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "angular2-notifications";
import {KjgServerService} from "../../../../theme/services/kjgServer/kjgServer.service";

@Component({
    selector: 'admin-news',
    styles: [require('./server.scss')],
    template: require('./server.component.html'),
})
export class AdminServerComponent implements OnInit {
    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    constructor(protected _serverService: KjgServerService, private _toastService: NotificationsService) {
    }

    servers: any[] = [];

    createTitle: string = '';
    createContent: string = '';
    createIp: string = '';
    createMode: string = '';

    id: string = '';
    editTitle: string = '';
    editContent: string = '';
    editIp: string = '';
    editMode: string = '';


    ngOnInit() {
        this.get();
    }

    onChange() {
        for (let server of this.servers) {
            if (server._id == this.id) {
                this.editTitle = server.title;
                this.editContent = server.content;
                this.editIp = server.server.ip;
                this.editMode = server.server.mode;
            }
        }
    }

    get() {
        this._serverService.get().subscribe(
            // the first argument is a function which runs on success
            data => {
                let keyNumber = 0;
                for (let key in data.obj) {
                    if (data.obj[key].server) {
                        this.servers[keyNumber] = data.obj[key];
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

    create() {
        const data = {
            title: this.createTitle,
            content: this.createContent,
            ip: this.createIp,
            mode: this.createMode
        };

        this._serverService.create(data).subscribe(
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

    update() {
        const data = {
            id: this.id,
            title: this.editTitle,
            content: this.editContent,
            ip: this.editIp,
            mode: this.editMode
        };

        this._serverService.change(data).subscribe(
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

    del() {
        const data = {
            id: this.id,
        };
        this._serverService.del(data).subscribe(
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

    switchSave(id, status) {
        const data = {
            id: id,
            status: status
        };
        console.log(id + ' || ' + status);
        this._serverService.status(data).subscribe(
            // the first argument is a function which runs on success
            data => {
                this._toastService.success(data.title, data.message);
                this.ngOnInit();
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done status server')
        );

    }
}
