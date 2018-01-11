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

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    HttpModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
