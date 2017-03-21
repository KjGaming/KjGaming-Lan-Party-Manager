import { Routes, RouterModule }  from '@angular/router';

import { UserEditComponent } from './userEdit.component';
import {FoodUserEditComponent} from "./Component/food/food.component";
import {GamesUserEditComponent} from "./Component/games/games.component";
import {PasswordUserEditComponent} from "./Component/password/password.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: UserEditComponent,
    children: [
      { path: 'games', component:  GamesUserEditComponent},
      { path: 'food', component: FoodUserEditComponent },
      { path: 'password', component: PasswordUserEditComponent },


    ]
  }
];

export const routing = RouterModule.forChild(routes);
