import { Routes, RouterModule }  from '@angular/router';

import { TCreateComponent } from './tCreat.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: TCreateComponent
  }
];

export const routing = RouterModule.forChild(routes);
