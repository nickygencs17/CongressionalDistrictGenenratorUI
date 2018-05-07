import {Routes} from '@angular/router';
import {MapComponent} from './map/mapcomponent';
import {StateComponent} from './state/state.component';
import {CreateuserComponent} from './createuser/createuser.component';
import {AddpostComponent} from './blog/addpost/addpost.component';
import {PostdetailComponent} from './blog/postdetail/postdetail.component';
import {PostComponent} from './blog/post/post.component';
import {AdminComponent} from './admin/admin.component';
import {LogComponent} from "./log/log.component";
import {AboutComponent} from "./about/about.component";
import {VotingComponent} from "./utilities/voting/voting.component";
import {CompareComponent} from "./compare/compare.component";


export const routes: Routes = [
  {path: '', component: MapComponent},
  {path: 'login', component: MapComponent},
  {path: 'state/:id', component: StateComponent},
  {path: 'register', component: CreateuserComponent},
  {path: 'blog', component: PostComponent},
  {path: 'about', component: AboutComponent},
  {path: 'voting', component: VotingComponent},
  {path: 'blog/posts/:id', component: PostdetailComponent},
  {path: 'blog/addpost', component: AddpostComponent},
  {path: 'compare', component: CompareComponent},
  {path: 'users', component: AdminComponent},
  {path: 'log', component: LogComponent},
  {path: '**', component: MapComponent}
];
