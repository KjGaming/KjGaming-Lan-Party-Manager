import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './tournament.routing';
import { TournamentComponent } from './tournament.component';
import { TournamentService } from "./tournament.service";
import { HttpModule } from "@angular/http";
import {TournamentEndComponent} from "./end.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule,
        ReactiveFormsModule
    ],
    declarations: [
        TournamentEndComponent
    ],
    providers: [
        TournamentService
    ]
})
export default class TournamentEndModule {
}
