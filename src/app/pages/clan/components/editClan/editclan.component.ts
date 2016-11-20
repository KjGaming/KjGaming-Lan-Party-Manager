import {Component, ViewEncapsulation} from '@angular/core';

import {EditClanService} from './editclan.service';

@Component({
  selector: 'clan-edit',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./editclan.scss')],
  template: require('./editclan.component.html')
})
export class EditClanComponent {
  

  public todoList:Array<any>;
  public newTodoText:string = '';

  constructor(private _editClanService:EditClanService) {
    this.todoList = this._editClanService.getTodoList();

  }

  getNotDeleted() {
    return this.todoList.filter((item:any) => {
      return !item.deleted
    })
  }

  addToDoItem($event) {

    if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() != '') {

      this.todoList.unshift({
        text: this.newTodoText
      });
      this.newTodoText = '';
    }
  }

}
