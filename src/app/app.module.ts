import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from "./app.component";
import {Router, RouterOutlet, Routes, ROUTES} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {httpInterceptorProviders} from "./core/interceptors/auth.interceptor";
import {JwtModule} from "@auth0/angular-jwt";
import {StorageKeysConfig} from "./core/configs/storage-keys.config";
import {TokenResponseInterface} from "./core/interfaces/token/token.interface";
import {UserStorageService} from "./core/services/storage/user-storage.service";


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
    {
      provide: ROUTES,
      useFactory: configPagesRoutes,
      deps: [
        UserStorageService
      ],
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}


export function configPagesRoutes(
  userStorageService: UserStorageService,
) {

  let routes: Routes = [];

  if (userStorageService.getIsClient()) {
    routes = [
      {
        path: '',
        loadChildren: () => import('./modules/client/client.module').then((m) => m.ClientModule),
      }
    ];
  } else if (userStorageService.getIsSpecialist()) {
      routes = [
          {
            path: '',
            loadChildren: () => import('./modules/specialist/specialist.module').then((m) => m.SpecialistModule),
          }
      ];
  }

  return routes;
}
