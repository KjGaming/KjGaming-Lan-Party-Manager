import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import {PasswordForgotComponent} from './pf.component';
import { routing }       from './pf.routing';
import {SimpleNotificationsModule} from "angular2-notifications/src/simple-notifications.module";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    SimpleNotificationsModule
  ],
  declarations: [
    PasswordForgotComponent
  ]
})
export default class PasswordForgotModule {}
