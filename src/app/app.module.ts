import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from "./app.component";
import {RouterOutlet} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {httpInterceptorProviders} from "./core/interceptors/auth.interceptor";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    CookieService,
    httpInterceptorProviders,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
