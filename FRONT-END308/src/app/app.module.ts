import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Mapd3Component } from './mapd3/mapd3.component';
import {HttpClientModule} from '@angular/common/http';
import { UsMapModule } from 'angular-us-map';
import { UsMapService } from './us-map.service';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { AlComponent } from './al/al.component';
import { AkComponent } from './ak/ak.component';
import { AzComponent } from './az/az.component';
import { ArComponent } from './ar/ar.component';
import { CaComponent } from './ca/ca.component';
import { CoComponent } from './co/co.component';
import { CtComponent } from './ct/ct.component';
import { DcComponent } from './dc/dc.component';
import { DeComponent } from './de/de.component';
import { FlComponent } from './fl/fl.component';
import { GaComponent } from './ga/ga.component';
import { HiComponent } from './hi/hi.component';
import { IdComponent } from './id/id.component';
import { IlComponent } from './il/il.component';
import { InComponent } from './in/in.component';
import { IaComponent } from './ia/ia.component';
import { KsComponent } from './ks/ks.component';
import { KyComponent } from './ky/ky.component';
import { LaComponent } from './la/la.component';
import { MeComponent } from './me/me.component';
import { MdComponent } from './md/md.component';
import { MaComponent } from './ma/ma.component';
import { MiComponent } from './mi/mi.component';
import { MnComponent } from './mn/mn.component';
import { MsComponent } from './ms/ms.component';
import { MoComponent } from './mo/mo.component';
import { MtComponent } from './mt/mt.component';
import { NeComponent } from './ne/ne.component';
import { NvComponent } from './nv/nv.component';
import { NhComponent } from './nh/nh.component';
import { NjComponent } from './nj/nj.component';
import { NmComponent } from './nm/nm.component';
import { NyComponent } from './ny/ny.component';
import { NcComponent } from './nc/nc.component';
import { NdComponent } from './nd/nd.component';
import { OhComponent } from './oh/oh.component';
import { OkComponent } from './ok/ok.component';
import { OrComponent } from './or/or.component';
import { PaComponent } from './pa/pa.component';
import { RiComponent } from './ri/ri.component';
import { ScComponent } from './sc/sc.component';
import { SdComponent } from './sd/sd.component';
import { TnComponent } from './tn/tn.component';
import { TxComponent } from './tx/tx.component';
import { UtComponent } from './ut/ut.component';
import { VtComponent } from './vt/vt.component';
import { VaComponent } from './va/va.component';
import { WaComponent } from './wa/wa.component';
import { WvComponent } from './wv/wv.component';
import { WiComponent } from './wi/wi.component';
import { WyComponent } from './wy/wy.component';

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
    WyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UsMapModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })],
  providers: [UsMapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
