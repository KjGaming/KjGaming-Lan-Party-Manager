import { Routes, RouterModule }  from '@angular/router';

import {TextBoxComponent} from "./textBox.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: TextBoxComponent
  }
];

export const routing = RouterModule.forChild(routes);
