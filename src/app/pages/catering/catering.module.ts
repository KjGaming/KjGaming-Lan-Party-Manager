import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './catering.routing';
import { CateringComponent } from './catering.component';
import { CateringService } from "./catering.service";
import { HttpModule } from "@angular/http";
import { SimpleNotificationsModule } from "angular2-notifications";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule,
        SimpleNotificationsModule
    ],
    declarations: [
        CateringComponent
    ],
    providers: [
    ]
})
export default class CateringModule {
}
