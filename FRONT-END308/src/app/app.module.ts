import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatToolbar, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { StateComponent } from './state/state.component';
import {StateService} from "./state.service";

@NgModule({
  declarations: [
    AppComponent,
    Mapd3Component,
    AutoCompleteComponent,
    StateComponent
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
    RouterModule.forRoot(routes, {
      useHash: true
    })],
  providers: [UsMapService, StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
