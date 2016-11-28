import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './tournament.routing';
import { TournamentComponent } from './tournament.component';
import { TournamentService } from "./tournament.service";
import { HttpModule } from "@angular/http";
import { B16Component } from "./components/b16/b16.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule
    ],
    declarations: [
        TournamentComponent,
        B16Component
    ],
    providers: [
        TournamentService
    ]
})
export default class TournamentModule {
}
