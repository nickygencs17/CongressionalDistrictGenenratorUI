import { Routes } from '@angular/router';
import { Mapd3Component } from './mapd3/mapd3.component';
import { StateComponent } from "./state/state.component";
import {CreateuserComponent} from "./createuser/createuser.component";
import {AddpostComponent} from './blogG/addpost/addpost.component';
import {PostdetailComponent} from './blogG/postdetail/postdetail.component';
import {PostComponent} from './blogG/post/post.component';

import { WhitepageComponent } from './utilities/whitepage/whitepage.component';


export const routes: Routes = [
  { path: '',       component: Mapd3Component },
  { path: 'login',  component: Mapd3Component },
  { path: 'state/:id',  component: StateComponent },
  { path: 'states/:id',  component: WhitepageComponent },
  { path: 'create_user',  component: CreateuserComponent },
  { path: 'blog',  component: PostComponent },
  { path: 'blog/posts/:id',  component: PostdetailComponent },
  { path: 'blog/addpost',  component: AddpostComponent },
  { path: '**',     component: Mapd3Component }


];
