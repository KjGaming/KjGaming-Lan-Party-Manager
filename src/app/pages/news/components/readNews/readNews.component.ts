import { Component, ViewEncapsulation } from '@angular/core';
import { ReadNewsService } from "./readNews.service";

@Component({
  selector: 'readNews',
  encapsulation: ViewEncapsulation.None,
  template: require('./readNews.component.html'),
  styles: [require('./readNews.scss')]
})

export class ReadNewsComponent {
  users: User[];
  constructor(private readNewsService: ReadNewsServicevice){}

  ngOnInit(){
    this.readNewsService.getUsers()
        .subscribe(
            (users: User[] => {
              this.users = users;
            })
        )
  }

}
