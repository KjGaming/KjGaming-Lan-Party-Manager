import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';

import {routing}       from './pages.routing';
import {NgaModule} from '../theme/nga.module';

import {Pages} from './pages.component';
import {NotificationsService} from "angular2-notifications/src/notifications.service";

@NgModule({
    imports: [CommonModule, NgaModule, routing],
    declarations: [Pages],
    providers: [NotificationsService],

})
export class PagesModule {
}
