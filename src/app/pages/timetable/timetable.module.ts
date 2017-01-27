import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './timetable.routing';
import { TimetableComponent } from './timetable.component';
import { HttpModule } from "@angular/http";
import {dayeventComponent} from "./component/dayEvent";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule
    ],
    declarations: [
        TimetableComponent
    ],
    providers: [
    ]
})
export default class TimetableModule {
}
