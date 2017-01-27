import {Component, ViewEncapsulation} from '@angular/core';

import {GlobalState} from '../../../global.state';
import { BaAuthService } from "../../services/baAuth/baAuth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'ba-page-top',
  styles: [require('./baPageTop.scss')],
  template: require('./baPageTop.html'),
  encapsulation: ViewEncapsulation.None
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  nickName = localStorage.getItem('nickName');

  constructor(private _state:GlobalState, private authService: BaAuthService, private router:Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
