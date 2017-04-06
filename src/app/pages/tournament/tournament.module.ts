import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './tournament.routing';
import { TournamentComponent } from './tournament.component';
import { TournamentService } from "./tournament.service";
import { HttpModule } from "@angular/http";
import { B16Component } from "./components/b16/b16.component";
import { PopoverModule } from "ng2-popover";
import { SimpleNotificationsModule } from "angular2-notifications/src/simple-notifications.module";
import { TournamentRegisterComponent } from "./components/register/register.component";
import { TournamentEndComponent } from "./components/end/end.component";
import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';
import { SwissComponent } from "./components/swiss/swiss.component";
import { B8Component } from "./components/b8/b8.component";
import { B4Component } from "./components/b4/b4.component";


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgaModule,
		routing,
		HttpModule,
		PopoverModule,
		ReactiveFormsModule,
		SimpleNotificationsModule,
		ModalModule


	],
	declarations: [
		TournamentComponent,
		B16Component,
		B8Component,
		B4Component,
		TournamentRegisterComponent,
		TournamentEndComponent,
		SwissComponent
	],
	providers: []
})
export default class TournamentModule {
}
