import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Mapd3Component } from './mapd3/mapd3.component';
import {HttpClientModule} from '@angular/common/http';
import { UsMapModule } from 'angular-us-map';
import { UsMapService } from './us-map.service';


@NgModule({
  declarations: [
    AppComponent,
    Mapd3Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UsMapModule
  ],
  providers: [UsMapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
