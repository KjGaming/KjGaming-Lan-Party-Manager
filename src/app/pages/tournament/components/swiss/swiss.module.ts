import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './tournament.routing';
import { TournamentComponent } from './tournament.component';
import { TournamentService } from "./tournament.service";
import { HttpModule } from "@angular/http";
import { SwissComponent } from "./components/swiss/swiss.component";


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
        SwissComponent
    ],
    providers: [
        TournamentService
    ]
})
export default class B16Module {
}
