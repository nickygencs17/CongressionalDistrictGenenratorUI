import { Routes } from '@angular/router';
import { Mapd3Component } from './mapd3/mapd3.component';
import { StateComponent } from "./state/state.component";
import {CreateuserComponent} from "./createuser/createuser.component";

export const routes: Routes = [
  { path: '',       component: Mapd3Component },
  { path: 'login',  component: Mapd3Component },
  { path: 'state/:id',  component: StateComponent },
  { path: 'create_user',  component: CreateuserComponent },
  { path: '**',     component: Mapd3Component }


];
