import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, RequestOptions,ConnectionBackend } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { NavbarComponent } from './bars/navbar/navbar.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeCollectionComponent } from './components/home-collection/home-collection.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { LibrariesComponent } from './components/libraries/libraries.component';
import { RentABookComponent } from './components/rent-a-book/rent-a-book.component';

import {AppRoutingModule} from './app.routing.module';
import { BackendService } from './services/backend.service';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    /*
        headerName: 'Authorization',
        headerPrefix: 'bearer',
        tokenGetter: (() => localStorage.getItem(this.tokenName)),
        */
  }), http, options);
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeCollectionComponent,
    AddBookComponent,
    LibrariesComponent,
    RentABookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
