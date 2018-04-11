import { Routes } from '@angular/router';
import { MapComponent } from './map/mapcomponent';
import { StateComponent } from './state/state.component';
import {CreateuserComponent} from './createuser/createuser.component';
import {AddpostComponent} from './blog/addpost/addpost.component';
import {PostdetailComponent} from './blog/postdetail/postdetail.component';
import {PostComponent} from './blog/post/post.component';
import { WhitepageComponent } from './utilities/whitepage/whitepage.component';
import { AdminComponent } from './admin/admin.component';


export const routes: Routes = [
  { path: '',       component: MapComponent },
  { path: 'login',  component: MapComponent },
  { path: 'state/:id',  component: StateComponent },
  { path: 'states/:id',  component: WhitepageComponent },
  { path: 'create_user',  component: CreateuserComponent },
  { path: 'blog',  component: PostComponent },
  { path: 'blog/posts/:id',  component: PostdetailComponent },
  { path: 'blog/addpost',  component: AddpostComponent },
  { path: 'admin',  component: AdminComponent },
  { path: '**',     component: MapComponent }
];
