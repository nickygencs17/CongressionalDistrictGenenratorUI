import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Mapd3Component } from './mapd3/mapd3.component';
import {HttpClientModule} from '@angular/common/http';
import { UsMapModule } from 'angular-us-map';
import { UsMapService } from './us-map.service';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { AlComponent } from './states/al/al.component';
import { AkComponent } from './states/ak/ak.component';
import { AzComponent } from './states/az/az.component';
import { ArComponent } from './states/ar/ar.component';
import { CaComponent } from './states/ca/ca.component';
import { CoComponent } from './states/co/co.component';
import { CtComponent } from './states/ct/ct.component';
import { DcComponent } from './states/dc/dc.component';
import { DeComponent } from './states/de/de.component';
import { FlComponent } from './states/fl/fl.component';
import { GaComponent } from './states/ga/ga.component';
import { HiComponent } from './states/hi/hi.component';
import { IdComponent } from './states/id/id.component';
import { IlComponent } from './states/il/il.component';
import { InComponent } from './states/in/in.component';
import { IaComponent } from './states/ia/ia.component';
import { KsComponent } from './states/ks/ks.component';
import { KyComponent } from './states/ky/ky.component';
import { LaComponent } from './states/la/la.component';
import { MeComponent } from './states/me/me.component';
import { MdComponent } from './states/md/md.component';
import { MaComponent } from './states/ma/ma.component';
import { MiComponent } from './states/mi/mi.component';
import { MnComponent } from './states/mn/mn.component';
import { MsComponent } from './states/ms/ms.component';
import { MoComponent } from './states/mo/mo.component';
import { MtComponent } from './states/mt/mt.component';
import { NeComponent } from './states/ne/ne.component';
import { NvComponent } from './states/nv/nv.component';
import { NhComponent } from './states/nh/nh.component';
import { NjComponent } from './states/nj/nj.component';
import { NmComponent } from './states/nm/nm.component';
import { NyComponent } from './states/ny/ny.component';
import { NcComponent } from './states/nc/nc.component';
import { NdComponent } from './states/nd/nd.component';
import { OhComponent } from './states/oh/oh.component';
import { OkComponent } from './states/ok/ok.component';
import { OrComponent } from './states/or/or.component';
import { PaComponent } from './states/pa/pa.component';
import { RiComponent } from './states/ri/ri.component';
import { ScComponent } from './states/sc/sc.component';
import { SdComponent } from './states/sd/sd.component';
import { TnComponent } from './states/tn/tn.component';
import { TxComponent } from './states/tx/tx.component';
import { UtComponent } from './states/ut/ut.component';
import { VtComponent } from './states/vt/vt.component';
import { VaComponent } from './states/va/va.component';
import { WaComponent } from './states/wa/wa.component';
import { WvComponent } from './states/wv/wv.component';
import { WiComponent } from './states/wi/wi.component';
import { WyComponent } from './states/wy/wy.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AutoCompleteComponent } from './utilities/auto-complete/auto-complete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatToolbar, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";

@NgModule({
  declarations: [
    AppComponent,
    Mapd3Component,
    AlComponent,
    AkComponent,
    AzComponent,
    ArComponent,
    CaComponent,
    CoComponent,
    CtComponent,
    DcComponent,
    DeComponent,
    FlComponent,
    GaComponent,
    HiComponent,
    IdComponent,
    IlComponent,
    InComponent,
    IaComponent,
    KsComponent,
    KyComponent,
    LaComponent,
    MeComponent,
    MdComponent,
    MaComponent,
    MiComponent,
    MnComponent,
    MsComponent,
    MoComponent,
    MtComponent,
    NeComponent,
    NvComponent,
    NhComponent,
    NjComponent,
    NmComponent,
    NyComponent,
    NcComponent,
    NdComponent,
    OhComponent,
    OkComponent,
    OrComponent,
    PaComponent,
    RiComponent,
    ScComponent,
    SdComponent,
    TnComponent,
    TxComponent,
    UtComponent,
    VtComponent,
    VaComponent,
    WaComponent,
    WvComponent,
    WiComponent,
    WyComponent,
    AutoCompleteComponent
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    MatTooltipModule,
    LeafletModule.forRoot(),
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
  providers: [UsMapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
