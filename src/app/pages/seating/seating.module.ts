import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './seating.routing';
import { SeatingComponent } from './seating.component';
import { SeatingService } from "./seating.service";
import { HttpModule } from "@angular/http";
import { PopoverModule } from "ng2-popover";
import { SimpleNotificationsModule } from "angular2-notifications/src/simple-notifications.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule,
        PopoverModule,
        SimpleNotificationsModule
    ],
    declarations: [
        SeatingComponent
    ],
    providers: [
        SeatingService
    ]
})
export default class SeatingModule {
}
