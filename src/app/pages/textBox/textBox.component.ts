import {
	Component,
	ViewEncapsulation,
	OnInit,
	AfterViewChecked,
	ViewChild,
	ElementRef,
	OnDestroy
} from '@angular/core';
import { Router } from "@angular/router";
import * as io from 'socket.io-client';
import { BaTextBoxService } from "../../theme/services/baTextBox/baTextBox.service";


@Component({
	selector: 'textBox',
	encapsulation: ViewEncapsulation.None,
	styles: [require('./textBox.scss')],
	template: require('./textBox.component.html'),
})

export class TextBoxComponent implements OnInit, AfterViewChecked {
	message = '';
	conversation = [];
	socket = null;
	time = '';

	@ViewChild('scrollMe') private myScrollContainer: ElementRef;

	constructor(private _router: Router, private _textBoxService: BaTextBoxService) {
	}

	ngOnInit() {
		this._textBoxService.get().subscribe(
			data => {
				console.log(data);
				this.conversation = data.obj;
			}
		);

		this.socket = io('/message');
		this.socket.on('chatUpdate', function (data) {
			this.conversation.push(data);
		}.bind(this));

		console.log(this.conversation);
	}

	ngAfterViewChecked() {
		this.scrollToBottom();
	}

	send() {
		let time = new Date();
		console.log('INSIDE');
		console.log(this.socket);
		this.socket.emit('newMessage', {
			'nickName': localStorage.getItem('nickName'),
			'text': this.message,
			'time': time
		});
		this.message = '';

	}

	keypressHandler(event) {
		if (event.keyCode == 13) {
			this.send();
		}
	}

	scrollToBottom(): void {
		try {
			this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
		} catch (err) {
		}
	}


}
