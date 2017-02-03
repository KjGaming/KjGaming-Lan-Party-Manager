import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';

import {routing}       from './tournament.routing';
import {TournamentComponent} from './tournament.component';
import {TournamentService} from "./tournament.service";
import {HttpModule} from "@angular/http";
import {B16Component} from "./components/b16/b16.component";
import {PopoverModule} from "ng2-popover";
import {SimpleNotificationsModule} from "angular2-notifications/src/simple-notifications.module";
import {TournamentRegisterComponent} from "./components/register/register.component";
import {TournamentEndComponent} from "./components/end/end.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        routing,
        HttpModule,
        PopoverModule,
        ReactiveFormsModule,
        SimpleNotificationsModule

    ],
    declarations: [
        TournamentComponent,
        B16Component,
        TournamentRegisterComponent,
        TournamentEndComponent
    ],
    providers: [
        TournamentService
    ]
})
export default class TournamentModule {
}
