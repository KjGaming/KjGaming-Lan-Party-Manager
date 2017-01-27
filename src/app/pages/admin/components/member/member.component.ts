import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {NotificationsService} from "angular2-notifications";
import {BaUserService} from "../../../../theme/services/baUser/baUser.service";


@Component({
    selector: 'basic-tables',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./member.scss')],
    template: require('./member.component.html')

})
export class AdminMemberComponent implements OnInit {

    users = [];
    public options = {
        position: ["top", "center"],
        timeOut: 5000
    };

    constructor(protected _userService: BaUserService, private _toastService: NotificationsService) {
    }

    /** Get all user information **/
    ngOnInit() {
        this._userService.getUserMemberlist().subscribe(
            // the first argument is a function which runs on success
            data => {

                for (let key in data.obj) {
                    /** Variable **/
                    let birth, lock;

                    if (data.obj[key].lock == true) {
                        lock = true;
                    } else {
                        lock = false;
                    }


                    /** Change to String Data **/
                    birth = new Date(data.obj[key].birth);

                    this.users[key] =
                        {
                            "name": data.obj[key].firstName + " '" + data.obj[key].nickName + "' " + data.obj[key].lastName,
                            "age": birth.getDate() + '.' + (birth.getMonth() + 1) + '.' + birth.getFullYear(),
                            "lock": lock,
                            "role": data.obj[key].role,
                            "packetPaid": data.obj[key].lan.packet.paid,
                            "lanPaid": data.obj[key].lan.paid,
                            "changeFood": data.obj[key].lan.food,
                            "id": data.obj[key]._id
                        }
                }
                console.log(this.users);

            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading users')
        );
    }

    /** Delete methode to delete a reg **/
    onDeleteConfirm(event): void {
        if (window.confirm('Willst du ' + event.data.name + ' wirklich löschen?')) {
            this._toastService.success('Erfolgreich', 'Du hast erfoglreich ' + event.data.name + ' gelöscht');
            event.confirm.resolve();
        } else {
            this._toastService.info('Info', 'Es wurde nichts gelöscht');
            event.confirm.reject();
        }
    }

    /** Change user by change one thing in the table **/
    switchSave(eventName, event, id) {
        let data = {
            _id: id,
            lock: null,
            role: null,
            packetPaid: null,
            paid: null
        };

        if (eventName == 'lock') {
            data.lock = event;
        }
        if (eventName == 'role') {
            data.role = event;
        }
        if (eventName == 'packetPaid') {
            data.packetPaid = event;
        }
        if (eventName == 'lanPaid') {
            data.paid = event;
        }

        console.log(data);
        this._userService.changeUser(data).subscribe(
            // the first argument is a function which runs on success
            data => {
                console.log(data);

            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done update User')
        );

        console.log('Die User ID => ' + id);
        console.log(event);

    }
}
