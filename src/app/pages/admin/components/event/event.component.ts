import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "angular2-notifications";
import {KjgEventService} from "../../../../theme/services/kjgEventService/kjgEvent.service";

@Component({
  selector: 'admin-event',
  styles: [require('./event.scss')],
  template: require('./event.component.html'),
})

export class AdminEventComponent implements OnInit {
  public options = {
    position: ["top", "center"],
    timeOut: 5000
  };

  constructor(private _toastService: NotificationsService, private _eventService: KjgEventService) {
  }
  events;
  id;

  createTitle:String;
  createStartTime;
  createEndTime;
  createMode;
  createContent;

  ngOnInit(){
    this.get();
  }

  get(){
    this._eventService.get().subscribe(
        // the first argument is a function which runs on success
        data => {
          this.events = data.obj;
          console.log(this.events);
        },
        // the second argument is a function which runs on error
        error => {
          this._toastService.error(error.title, error.error.message);
          console.error(error);
        },
        // the third argument is a function which runs on completion
        () => console.log('get events')
    );
  }

  create(){
    let data = {
      title: this.createTitle,
      timeStart: new Date(this.createStartTime).getTime(),
      timeEnd: new Date(this.createEndTime).getTime(),
      mode: this.createMode,
      content: this.createContent
    };
    console.log(data);

    this._eventService.create(data).subscribe(
        // the first argument is a function which runs on success
        data => {
          this._toastService.success(data.title, data.message);
        },
        // the second argument is a function which runs on error
        error => {
          this._toastService.error(error.title, error.error.message);
          console.error(error);
        },
        // the third argument is a function which runs on completion
        () => console.log('creat event')
    );
  }

  del(){
    let data = {
      id: this.id
    };
    this._eventService.del(data).subscribe(
        // the first argument is a function which runs on success
        data => {
          this._toastService.success(data.title, data.message);
        },
        // the second argument is a function which runs on error
        error => {
          this._toastService.error(error.title, error.error.message);
          console.error(error);
        },
        // the third argument is a function which runs on completion
        () => console.log('creat event')
    );

  }
}
