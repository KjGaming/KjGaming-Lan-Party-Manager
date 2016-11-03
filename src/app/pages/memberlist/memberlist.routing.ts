import { Routes, RouterModule }  from '@angular/router';

import { MemberlistComponent } from './memberlist.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: MemberlistComponent
  }
];

export const routing = RouterModule.forChild(routes);
