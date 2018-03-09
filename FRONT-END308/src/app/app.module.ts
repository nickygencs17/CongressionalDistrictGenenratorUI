import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { Mapd3Component } from './mapd3/mapd3.component';
import {HttpClientModule} from '@angular/common/http';
import { UsMapModule } from 'angular-us-map';
import { UsMapService } from './us-map.service';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AutoCompleteComponent } from './utilities/auto-complete/auto-complete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatToolbar, MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { StateComponent } from './state/state.component';
import {StateService} from "./state.service";
import { PostdetailComponent } from './blogG/postdetail/postdetail.component';
import { PostComponent } from './blogG/post/post.component';

import { PostService } from './services/post.service';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    Mapd3Component,
    AutoCompleteComponent,
    StateComponent,
    PostdetailComponent,
    PostComponent
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    MatTooltipModule,
    LeafletModule,
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsMapModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })],
  providers: [UsMapService, StateService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
