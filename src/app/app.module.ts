import { RightbarComponent } from './rightbar/rightbar.component';
import { User } from './home/user';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {Route, RouterModule} from '@angular/router';

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
import { Ng2CompleterModule } from "ng2-completer";

const ROUTES: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
    HeaderComponent,
    SidebarComponent,
    ButtonbarComponent,
    HomeComponent,
    LoginComponent,
    RightbarComponent
  ],
  imports: [
    BrowserModule,
    Ng2CompleterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey,
      libraries: ['places']
    }),
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [User],
  bootstrap: [AppComponent]  
})
export class AppModule { }
