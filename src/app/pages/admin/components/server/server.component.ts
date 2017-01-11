import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from "@angular/forms";
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
    public allServer = ["Kein Server aktive"];

    /** Formula variables **/
    public formAdd: FormGroup;
    public formEdit: FormGroup;
    public formDel: FormGroup;

    public addTitle: AbstractControl;
    public addContent: AbstractControl;
    public addStatus: AbstractControl;
    public addMode: AbstractControl;
    public addIp: AbstractControl;

    public editServer: AbstractControl;
    public editTitle: AbstractControl;
    public editContent: AbstractControl;
    public editStatus: AbstractControl;
    public editMode: AbstractControl;
    public editIp: AbstractControl;

    public delServer: AbstractControl;

    constructor(fb: FormBuilder, private _toastService: NotificationsService) {
        this.formAdd = fb.group({
            'title': [''],
            'content': [''],
            'status': [''],
            'mode': [''],
            'ip': ['']
        });

        this.addTitle = this.formAdd.controls['title'];
        this.addContent = this.formAdd.controls['content'];
        this.addStatus = this.formAdd.controls['status'];
        this.addMode = this.formAdd.controls['mode'];
        this.addIp = this.formAdd.controls['ip'];

        this.formEdit = fb.group({
            'server': [''],
            'title': [''],
            'content': [''],
            'status': [''],
            'mode': [''],
            'ip': ['']
        });

        this.editServer = this.formEdit.controls['server'];
        this.editTitle = this.formEdit.controls['title'];
        this.editContent = this.formEdit.controls['content'];
        this.editStatus = this.formEdit.controls['status'];
        this.editMode = this.formEdit.controls['mode'];
        this.editIp = this.formEdit.controls['ip'];

        this.formDel = fb.group({
            'server': ['']
        });

        this.delServer = this.formDel.controls['server'];

    }

    addServer(event) {
        console.log(event);
    }

    ngOnInit() {
        this.allServer = ["Server1","Server2","Server3","Server4"];
        console.log(this.allServer);
    }
}
