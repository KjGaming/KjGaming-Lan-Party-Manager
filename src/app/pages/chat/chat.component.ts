import {
    Component,
    ViewEncapsulation,
    OnInit,
    AfterViewChecked,
    ViewChild,
    ElementRef,
    OnDestroy
} from '@angular/core';
import {Router} from "@angular/router";
import * as io from 'socket.io-client';


@Component({
    selector: 'chat',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./chat.scss')],
    template: require('./chat.component.html'),
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
    message = '';
    conversation = [];
    socket = null;
    time = '';
    userList = [];

    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    constructor(private _router: Router) {
    }

    ngOnInit() {
        let url = window.location.host;
        this.socket = io('/chat');
        this.socket.emit('newUser', localStorage.getItem('nickName'));
        this.socket.on('chatUpdate', function (data) {
            this.conversation.push(data);
        }.bind(this));
        this.socket.on('update-user', function (data) {
            this.userList = data;
        }.bind(this));

        console.log(this.conversation);
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    ngOnDestroy() {
        this.socket.emit('leaveUser', localStorage.getItem('nickName'));
        this.socket.on('update-user', function (data) {
            this.userList = data;
        }.bind(this));
    }

    send() {
        let time = new Date();
        this.socket.emit('newMessage', {
            'nickName': localStorage.getItem('nickName'),
            'text': this.message,
            'time': time
        });
        this.message = '';

        console.log(this.userList);

    }

    keypressHandler(event) {
        if (event.keyCode == 13) {
            this.send();
        }
    }

    isNewUserAlert(data) {
        return data.nickName === '';
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) {
        }
    }



}
