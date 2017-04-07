import {Routes, RouterModule}  from '@angular/router';
import {AuthGuard, RegGuard} from "../theme/guard";

import {TournamentComponent} from './tournament.component';
import {B16Component} from "./components/b16/b16.component";
import {B4Component} from "./components/b4/b4.component";
import {B8Component} from "./components/b8/b8.component";
import {TournamentRegisterComponent} from "./components/register/register.component";
import {TournamentEndComponent} from "./components/end/end.component";
import {SwissComponent} from "./components/swiss/swiss.component";
import { TVoteComponent } from "app/pages/tournament/components/tVote";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    {
        path: '',
        component: TournamentComponent
    },
    {
        path: 'b4',
        component: B4Component
    },
    {
        path: 'b8',
        component: B8Component
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
    },
    {
        path: 'vote',
        component: TVoteComponent
    }

];

export const routing = RouterModule.forChild(routes);

