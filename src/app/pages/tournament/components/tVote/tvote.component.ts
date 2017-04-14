import {
	Component,
	ViewEncapsulation,
	OnInit,
	AfterViewChecked,
	OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import * as io from 'socket.io-client';
import { NotificationsService } from "angular2-notifications/src/notifications.service";



@Component({
	selector: 'tVote',
	encapsulation: ViewEncapsulation.None,
	styles: [require('./tvote.scss')],
	template: require('./tvote.component.html'),
})
export class TVoteComponent implements OnInit, AfterViewChecked, OnDestroy {
	message = '';
	room;
	socket;
	sTime: String = 'Test';
	maps: Object[] = [
		{
			'name': 'Dust2',
			'img': 'https://thelibrarycsgo.files.wordpress.com/2012/09/csgo-2012-09-01-11-28-34-45.jpg'
		},
		{
			'name': 'Inferno',
			'img': 'http://www.dexerto.com/app/uploads/2016/10/inferno-8.jpg'
		},
		{
			'name': 'Mirage',
			'img': 'http://www.dexerto.com/app/uploads/2016/10/inferno-8.jpg'
		},
		{
			'name': 'Overpass',
			'img': 'http://www.dexerto.com/app/uploads/2016/10/inferno-8.jpg'
		},
		{
			'name': 'Cache',
			'img': 'http://www.dexerto.com/app/uploads/2016/10/inferno-8.jpg'
		},
		{
			'name': 'Cobblestone',
			'img': 'http://www.dexerto.com/app/uploads/2016/10/inferno-8.jpg'
		},
		{
			'name': 'Train',
			'img': 'http://www.dexerto.com/app/uploads/2016/10/inferno-8.jpg'
		},
		{
			'name': 'Nuke',
			'img': 'http://www.dexerto.com/app/uploads/2016/10/inferno-8.jpg'
		}
	];
	public options = {
		position: ["top", "center"],
		timeOut: 5000
	};
	subscription;
	rU1 = false;
	rU2 = false;


	constructor(private _router: ActivatedRoute,private _r: Router,private _toastService: NotificationsService) {

	}

	ngOnInit() {
		this.subscription = this._router.queryParams.subscribe(
			(queryParam: any) => this.room = queryParam['room']
		);
		console.log('WUHUHUHUHU');
		this.socket = io('/vote');
		this.socket.emit('joinRoom', this.room, localStorage.getItem('nickName'));
		this.socket.on('error123', (data) => {
			/*this._r.navigate(['/pages/tournament']);*/
			console.error(data);
			/*this._toastService.error('Fehler', data);*/
		});
	}

	ngAfterViewChecked() {

	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
		this.socket.emit('leaveUser', this.room);
	}

	send() {
	}

	voteMap(map) {
		console.log(map);
	}

	ready(user) {
		this.socket.emit('ready', user);
		this.socket.on('userReady', (user) => {
			if(user == 1){
				this.rU1 = true;
			}else{
				this.rU2 = true;
			}
		});
		console.log(user);
		this.sTime = 'es geht doch! => ' + this.room;

	}


}
