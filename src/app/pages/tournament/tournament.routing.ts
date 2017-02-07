import {Routes, RouterModule}  from '@angular/router';
import {AuthGuard, RegGuard} from "../theme/guard";

import {TournamentComponent} from './tournament.component';
import {B16Component} from "./components/b16/b16.component";
import {TournamentRegisterComponent} from "./components/register/register.component";
import {TournamentEndComponent} from "./components/end/end.component";
import {SwissComponent} from "./components/swiss/swiss.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: TournamentComponent
    },
    {
        path: 'b16',
        component: B16Component
    },
    {
        path: 'swiss',
        component: SwissComponent
    },
    {
        path: 'register',
        component: TournamentRegisterComponent
    },
    {
        path: 'end',
        component: TournamentEndComponent
    }

];

export const routing = RouterModule.forChild(routes);

