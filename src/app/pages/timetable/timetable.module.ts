import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './timetable.routing';
import { TimetableComponent } from './timetable.component';
import { TimetableService } from "./timetable.service";
import { HttpModule } from "@angular/http";


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
        TimetableService
    ]
})
export default class TimetableModule {
}
