import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TVoteComponent } from './tvote.component';
import {NgaModule} from "../../../../theme/nga.module";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule
  ],
  declarations: [
    TVoteComponent
  ]
})
export default class tVoteModule {}
