import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './tournament.routing';
import { TournamentComponent } from './tournament.component';
import { TournamentService } from "./tournament.service";
import { HttpModule } from "@angular/http";
import { B4Component } from "./components/b4/b4.component";
import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		NgaModule,
		routing,
		HttpModule,
		ReactiveFormsModule,
		ModalModule
	],
	declarations: [
		B4Component
	],
	providers: [
		TournamentService
	]
})
export default class B4Module {
}
