import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from "./app.component";
import {RouterOutlet} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {httpInterceptorProviders} from "./core/interceptors/auth.interceptor";
import {JwtModule} from "@auth0/angular-jwt";
import {StorageKeysConfig} from "./core/configs/storage-keys.config";
import {TokenResponseInterface} from "./core/interfaces/token/token.interface";


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
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          const token: TokenResponseInterface = JSON.parse(window.sessionStorage.getItem(StorageKeysConfig.storageTokenKeyName)!);
          return token.access;
        },
        allowedDomains: ['nutrisha.live'],
        throwNoTokenError: true,
        skipWhenExpired: true
      }
    })
  ],
  providers: [
    CookieService,
    httpInterceptorProviders,

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
