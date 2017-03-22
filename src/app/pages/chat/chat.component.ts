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

    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    constructor(private _router: Router) {
    }

    ngOnInit() {
        let url = window.location.host;
        this.socket = io(url);
        this.socket.emit('newUser', localStorage.getItem('nickName'));
        this.socket.on('chatUpdate', function (data) {
            this.conversation.push(data);
        }.bind(this));
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    ngOnDestroy() {
        this.socket.emit('leaveUser', localStorage.getItem('nickName'));
    }

    send() {
        let time = new Date();
        let timeString = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours())
            + ':' +
            (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes())
            + ':' +
            (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds());
        this.socket.emit('newMessage', {
            'userName': localStorage.getItem('nickName'),
            'text': this.message,
            'time': timeString
        });
        this.message = '';

    }

    keypressHandler(event) {
        if (event.keyCode == 13) {
            this.send();
        }
    }

    isNewUserAlert(data) {
        return data.userName === '';
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) {
        }
    }

}
