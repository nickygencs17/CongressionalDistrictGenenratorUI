import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';

import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {FlexLayoutModule} from '@angular/flex-layout';
import {AppComponent} from './app.component';
import {MapComponent} from './map/mapcomponent';
import {UsMapModule} from 'angular-us-map';
import {UsMapService} from './services/us-map.service';
import {routes} from './app.routes';
import {RouterModule} from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AutoCompleteComponent} from './utilities/auto-complete/auto-complete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {StateComponent} from './state/state.component';
import {StateService} from './services/state.service';
import {NavbarComponent} from './utilities/navbar/navbar.component';
import {LogindialogComponent} from './utilities/logindialog/logindialog.component';
import {CreateuserComponent} from './createuser/createuser.component';
import {PostdetailComponent} from './blog/postdetail/postdetail.component';
import {AddpostComponent} from './blog/addpost/addpost.component';
import {PostComponent} from './blog/post/post.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {StateIdService} from './services/state-id.service';
import {UserService} from './services/user.service';
import {PostService} from './services/post.service';
import {MatSliderModule} from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';
import {AdminComponent} from './admin/admin.component'
import {MatTabsModule} from '@angular/material/tabs';
import {TableComponent} from './utilities/table/table.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {PresidentelectiontableComponent} from './utilities/presidentelectiontable/presidentelectiontable.component';
import {CongresselectiontableComponent} from './utilities/congresselectiontable/congresselectiontable.component';
import {LogComponent} from "./log/log.component";
import {DatePipe} from '@angular/common';
import {AboutComponent} from './about/about.component';
import {VotingComponent} from './voting/voting.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AutoCompleteComponent,
    StateComponent,
    NavbarComponent,
    LogindialogComponent,
    CreateuserComponent,
    PostdetailComponent,
    PostComponent,
    AddpostComponent,
    AdminComponent,
    TableComponent,
    PresidentelectiontableComponent,
    CongresselectiontableComponent,
    LogComponent,
    AboutComponent,
    VotingComponent
  ],
  entryComponents: [LogindialogComponent],
  imports: [
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    MatRadioModule,
    MatTooltipModule,
    LeafletModule,
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatSliderModule,
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

  providers: [UsMapService, StateService, StateIdService, UserService, PostService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
