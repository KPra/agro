import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';

export const firebaseConfig = environment.firebaseConfig;
import { AppComponent } from './app.component';
import {AgmCoreModule} from '@agm/core';
import { GoogleMapComponent } from './google-map/google-map.component';
import { HeaderComponent } from './header/header.component';
import {HttpModule} from '@angular/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ButtonbarComponent } from './buttonbar/buttonbar.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
    HeaderComponent,
    SidebarComponent,
    ButtonbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey,
      libraries: ['places']
    }),
    HttpModule,
    HttpClientModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
