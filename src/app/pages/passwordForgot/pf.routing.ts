import { Routes, RouterModule }  from '@angular/router';

import { PasswordForgotComponent } from './pf.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: PasswordForgotComponent
  }
];

export const routing = RouterModule.forChild(routes);
