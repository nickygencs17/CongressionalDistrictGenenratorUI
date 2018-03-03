import { Routes } from '@angular/router';
import { Mapd3Component } from './mapd3/mapd3.component';
import { StateComponent } from "./state/state.component";

export const routes: Routes = [
  { path: '',       component: Mapd3Component },
  { path: 'login',  component: Mapd3Component },
  { path: 'state',  component: StateComponent },
  { path: '**',     component: Mapd3Component }


];
