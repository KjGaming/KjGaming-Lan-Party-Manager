import {
  Component,
  ViewEncapsulation,
  OnInit,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';
import { Router } from "@angular/router";
import * as io from 'socket.io-client';


@Component({
  selector: 'tVote',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./tvote.scss')],
  template: require('./tvote.component.html'),
})
export class TVoteComponent implements OnInit, AfterViewChecked, OnDestroy {
  message = '';
  room = '1234';
  socket;
  conversation = [];
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


  constructor(private _router: Router) {

  }

  ngOnInit() {
    this.socket = io('/vote');
    this.socket.emit('jRoom', this.room, localStorage.getItem('nickName'));
    this.socket.on('voteObj', (data) => {
      console.log(data);
    });

  }

  ngAfterViewChecked() {

  }

  ngOnDestroy() {
  }

  send() {


  }

  voteMap(map) {
    console.log(map);
  }

  ready(user) {
    console.log(user);
    this.sTime = 'es geht doch!';
  }


}
