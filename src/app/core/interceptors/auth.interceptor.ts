import { Injectable } from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {TokenStorageService} from "../services/storage/token-storage.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../services/api/auth.service";
import {BaseAppConfig} from "../configs/base-app.config";

@Injectable({providedIn: 'root'})
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;

  constructor(
    private jwtHelperService: JwtHelperService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokenStorageService.getToken()) {
      req = req.clone({
        setHeaders: { Authorization: 'Bearer ' + this.tokenStorageService.getToken().access }
      });
    }
    else {
      req = req.clone({
        setHeaders: { Authorization: 'Basic ' + btoa(BaseAppConfig.systemUserName + ':' + BaseAppConfig.systemUserPassword) }
      });
    }

    return next.handle(req).pipe(
      catchError((error: any) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('login') &&
          error.status === 401
        ){
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      const token = this.tokenStorageService.getToken();

      if (token) {
        if (!this.jwtHelperService.isTokenExpired()){
          request = request.clone({
            setHeaders: { Authorization: 'Bearer '+ token.access }
          })
          return next.handle(request);
        }
        else
        {
          this.authService.refreshToken(token).subscribe(token => {
              this.tokenStorageService.removeToken();
              this.tokenStorageService.saveToken(token);
              this.isRefreshing = false;
              request = request.clone({
                setHeaders: { Authorization: 'Bearer '+ token.access }
              })
              return next.handle(request);
            },
            error => {
              this.isRefreshing = false;
              this.tokenStorageService.removeToken();
              this.router.navigate(['/common/main']);
              return throwError(() => error);
            });
        }
      }
      else{
        let reqClone = request.clone({
          setHeaders: { Authorization: 'Basic ' + btoa(BaseAppConfig.systemUserName + ':' + BaseAppConfig.systemUserPassword) }
        });
        return next.handle(reqClone);
      }
    }

    return next.handle(request);
  }
}

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true,
  }
]
