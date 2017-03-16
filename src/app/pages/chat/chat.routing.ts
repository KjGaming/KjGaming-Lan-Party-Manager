import { Routes, RouterModule }  from '@angular/router';

import {ChatComponent} from "./chat.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ChatComponent
  }
];

export const routing = RouterModule.forChild(routes);
