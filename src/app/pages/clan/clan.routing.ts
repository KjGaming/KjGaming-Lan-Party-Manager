import { Routes, RouterModule }  from '@angular/router';

import { ClanComponent } from './clan.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ClanComponent
  }
];

export const routing = RouterModule.forChild(routes);
