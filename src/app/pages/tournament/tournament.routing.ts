import {Routes, RouterModule}  from '@angular/router';
import {AuthGuard, RegGuard} from "../theme/guard";

import {TournamentComponent} from './tournament.component';
import {B16Component} from "./components/b16/b16.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: TournamentComponent
    },
    {
        path: 'b16',
        component: B16Component
    }

];

export const routing = RouterModule.forChild(routes);

