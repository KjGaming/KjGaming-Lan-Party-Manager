import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";

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

    /** variables **/
    public allServer;

    /** Formula variables **/
    public formAdd: FormGroup;
    public formEdit: FormGroup;
    public formDel: FormGroup;
    public server: AbstractControl;
    public title: AbstractControl;
    public content: AbstractControl;
    public status: AbstractControl;
    public mode: AbstractControl;
    public ip: AbstractControl;

    constructor(fb: FormBuilder, private _toastService: NotificationsService) {
        this.formAdd = fb.group({
            'title': [''],
            'content': [''],
            'status': [''],
            'mode': [''],
            'ip': ['']
        });

        this.title = this.formAdd.controls['title'];
        this.content = this.formAdd.controls['content'];
        this.status = this.formAdd.controls['status'];
        this.mode = this.formAdd.controls['mode'];
        this.ip = this.formAdd.controls['ip'];

        this.formEdit = fb.group({
            'server': [''],
            'title': [''],
            'content': [''],
            'status': [''],
            'mode': [''],
            'ip': ['']
        });

        this.server = this.formEdit.controls['server'];
        this.title = this.formEdit.controls['title'];
        this.content = this.formEdit.controls['content'];
        this.status = this.formEdit.controls['status'];
        this.mode = this.formEdit.controls['mode'];
        this.ip = this.formEdit.controls['ip'];

        this.formDel = fb.group({
            'server': ['']
        });

        this.server = this.formDel.controls['server'];

    }

    addServer(event) {
        console.log(event);
    }

    ngOnInit() {
        this.allServer = ["Server1","Server2","Server3","Server4"];
        console.log(allServer);
    }
}
