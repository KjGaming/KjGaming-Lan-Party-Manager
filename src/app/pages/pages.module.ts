import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';

import {routing}       from './pages.routing';
import {NgaModule} from '../theme/nga.module';

import {Pages} from './pages.component';
import {NotificationsService} from "angular2-notifications/src/notifications.service";
import {SimpleNotificationsModule} from "angular2-notifications/src/simple-notifications.module";

@NgModule({
    imports: [CommonModule, NgaModule, routing, SimpleNotificationsModule],
    declarations: [Pages],
    providers: [NotificationsService],

})
export class PagesModule {
}
