import { Routes } from '@angular/router';
import { Mapd3Component } from './mapd3/mapd3.component';
import { StateComponent } from "./state/state.component";
import { PostComponent } from "./blogG/post/post.component";
import { PostdetailComponent } from "./blogG/postdetail/postdetail.component";

export const routes: Routes = [
  { path: '',       component: Mapd3Component },
  { path: 'login',  component: Mapd3Component },
  { path: 'state/:id',  component: StateComponent },
  { path: 'blog',  component: PostComponent },
  { path: 'blog/posts/:id',  component: PostdetailComponent },
  { path: '**',     component: Mapd3Component }


];
