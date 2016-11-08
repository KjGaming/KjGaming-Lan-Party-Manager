import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'admin',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `<router-outlet></router-outlet>`
})
export class AdminComponent {

  constructor() {
  }

  ngOnInit() {
  }

}
