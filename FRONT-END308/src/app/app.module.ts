import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { Mapd3Component } from './mapd3/mapd3.component';
import { UsMapModule } from 'angular-us-map';
import { UsMapService } from './us-map.service';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AutoCompleteComponent } from './utilities/auto-complete/auto-complete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatToolbar, MatToolbarModule, MatSelectModule,
  MatTooltipModule, MatDialogModule
} from '@angular/material';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { StateComponent } from './state/state.component';
import {StateService} from "./state.service";
import {NavbarComponent} from "./utilities/navbar/navbar.component";
import {LogindialogComponent} from "./utilities/logindialog/logindialog.component";
import {CreateuserComponent} from "./createuser/createuser.component";
import {PostdetailComponent} from "./blogG/postdetail/postdetail.component";
import {AddpostComponent} from "./blogG/addpost/addpost.component";
import {PostComponent} from "./blogG/post/post.component";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {StateIdService} from "./state-id.service";
import {UserService} from "./user.service";
import {PostService} from "./services/post.service";
import { WhitepageComponent } from './utilities/whitepage/whitepage.component';


@NgModule({
  declarations: [
    AppComponent,
    Mapd3Component,
    AutoCompleteComponent,
    StateComponent,
    NavbarComponent,
    LogindialogComponent,
    CreateuserComponent,
    PostdetailComponent,
    PostComponent,
    AddpostComponent,
    WhitepageComponent
  ],
  entryComponents: [LogindialogComponent],
  imports: [
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    MatTooltipModule,
    LeafletModule,
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatDialogModule,
    UsMapModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })],

  providers: [UsMapService, StateService,StateIdService, UserService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
