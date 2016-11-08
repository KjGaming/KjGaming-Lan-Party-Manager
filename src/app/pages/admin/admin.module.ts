import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './admin.routing';
import { AdminComponent } from './admin.component';
import { SettingsComponent } from './components/settings/settings.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    AdminComponent,
    SettingsComponent,
  ],
  providers: [
  ]
})
export default class AdminModule {}
