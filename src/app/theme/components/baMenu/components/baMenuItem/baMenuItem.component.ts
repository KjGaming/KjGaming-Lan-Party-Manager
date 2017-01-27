import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BaAuthService } from "../../../../services/baAuth/baAuth.service";

@Component({
    selector: 'ba-menu-item',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./baMenuItem.scss')],
    template: require('./baMenuItem.html')
})
export class BaMenuItem implements OnInit{

    @Input() menuItem: any;
    @Input() child: boolean = false;

    @Output() itemHover = new EventEmitter<any>();
    @Output() toggleSubMenu = new EventEmitter<any>();

    admin: boolean;

    constructor(private authService: BaAuthService){}

    public onHoverItem($event): void {
        this.itemHover.emit($event);
    }

    public onToggleSubMenu($event, item): boolean {
        $event.item = item;
        this.toggleSubMenu.emit($event);
        return false;
    }


    ngOnInit(){
        this.admin = this.authService.isAdmin();
    }
}
