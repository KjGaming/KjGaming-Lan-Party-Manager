import {Component, ViewEncapsulation} from '@angular/core';

import {CreatClanService} from './creatclan.service';

@Component({
  selector: 'clan-creat',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./creatclan.scss')],
  template: require('./creatclan.component.html')
})
export class CreatClanComponent {
  

  public todoList:Array<any>;
  public newTodoText:string = '';

  constructor(private _creatClanService:CreatClanService) {
  }

}
