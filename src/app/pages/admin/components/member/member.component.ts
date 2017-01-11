import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from "@angular/platform-browser";



@Component({
    selector: 'basic-tables',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./member.scss')],
    template: require('./member.component.html')

})
export class AdminMemberComponent implements OnInit{

    users = [];

    constructor(protected service: SmartTablesService, private _sanitizer: DomSanitizer) {

    }

    ngOnInit(){
        this.service.getUserMemberlist().subscribe(
            // the first argument is a function which runs on success
            data => {
                console.log(data.obj);
                for(let key in data.obj){
                    this.users[key] =
                        {
                            "name": data.obj[key].firstName +" '"+ data.obj[key].nickName +"' "+ data.obj[key].lastName,
                            "age": data.obj[key].birth,
                            "lock": data.obj[key].lock,
                            "role": data.obj[key].role,
                            "packetPaid": data.obj[key].lan.packet.paid,
                            "lanPaid": data.obj[key].lan.paid,
                            "changeFood": data.obj[key].lan.food
                        }
                }
                console.log(this.users);
                this.source.load(this.users);

            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading news')
        );
    }

    settings = {
        noDataMessage: 'Keine Daten Vorhanden',
        edit: {
            editButtonContent: '<i class="ion-edit"></i>',
            saveButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>',
            confirmSave: true
        },
        delete: {
            deleteButtonContent: '<i class="ion-trash-a"></i>',
            confirmDelete: true
        },
        columns: {
            name: {
                title: 'Name',
                type: 'String',
                editable: false
            },
            age: {
                title: 'Alter',
                type: 'String',
                class: 'age',
                editable: false
            },
            lock: {
                title: 'LAN-Manager',
                type: 'String'
            },
            role: {
                title: 'Rolle',
                type: 'String'
            },
            packetPaid: {
                title: 'LAN-Paket',
                type: 'String'
            },
            lanPaid: {
                title: 'LAN-Kosten',
                type: 'String'
            },
            changeFood: {
                title: 'Lan Essen',
                type: 'String'
            }

        }
    };

    source: LocalDataSource = new LocalDataSource();


    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    onSaveConfirm(event): void {
        console.log(event);
        event.confirm.resolve();
    }

    onCreateConfirm(event): void {
        console.log(event);
        event.confirm.resolve();
    }

}
