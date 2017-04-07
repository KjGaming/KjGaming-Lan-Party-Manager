import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { SimpleNotificationsModule } from "angular2-notifications";
import { routing }       from './tCreat.routing';
import { TCreateComponent } from './tCreat.component';
import { HttpModule } from "@angular/http";


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
		TCreateComponent
	]
})
export default class TCreateModule {
}
