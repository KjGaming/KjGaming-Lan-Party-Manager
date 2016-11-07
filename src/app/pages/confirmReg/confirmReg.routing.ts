import { Routes, RouterModule }  from '@angular/router';

import { confirmRegComponent } from './confirmReg.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: confirmRegComponent
  }
];

export const routing = RouterModule.forChild(routes);
