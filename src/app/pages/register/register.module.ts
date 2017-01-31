import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Register } from './register.component';
import { routing }       from './register.routing';
import { ReCaptchaModule } from 'angular2-recaptcha';
import {SimpleNotificationsModule} from "angular2-notifications/src/simple-notifications.module";
import { MyDatePickerModule } from 'mydatepicker';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    ReCaptchaModule,
    SimpleNotificationsModule,
    MyDatePickerModule
  ],
  declarations: [
    Register
  ]
})
export default class RegisterModule {}
