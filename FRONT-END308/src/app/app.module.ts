import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Mapd3Component } from './mapd3/mapd3.component';
import { UsMapModule } from 'angular-us-map';
import { UsMapService } from './us-map.service';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AutoCompleteComponent } from './utilities/auto-complete/auto-complete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatToolbar, MatToolbarModule,
  MatTooltipModule, MatSelectModule
} from '@angular/material';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { StateComponent } from './state/state.component';
import {StateService} from "./state.service";
import { NavbarComponent } from './navbar/navbar.component';
import { LogindialogComponent } from './logindialog/logindialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { StateIdService } from './state-id.service';
import { CreateuserComponent } from './createuser/createuser.component';


@NgModule({
  declarations: [
    AppComponent,
    Mapd3Component,
    AutoCompleteComponent,
    StateComponent,
    NavbarComponent,
    LogindialogComponent,
    CreateuserComponent
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
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatDialogModule,
    UsMapModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })],
  providers: [UsMapService, StateService,StateIdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
