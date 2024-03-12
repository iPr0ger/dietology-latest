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
import {EventBusService} from "../event-bus/event-bus.service";
import {AuthService} from "../services/auth.service";
import {UserStorageService} from "../services/storage/user-storage.service";
import {EventData} from "../event-bus/event.class";
import {TokenStorageService} from "../services/storage/token-storage.service";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;

  constructor(
    private userStorageService: UserStorageService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
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
      req = req.clone({});
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

      if (this.tokenStorageService.getToken()) {
        this.authService.refreshToken().subscribe(token => {
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
          this.router.navigate(['/auth/login']);
          return throwError(() => error);
        });


        // return this.authService.refreshToken().pipe(
        //   switchMap(() => {
        //     this.isRefreshing = false;
        //
        //     return next.handle(request);
        //   }),
        //   catchError((error) => {
        //     this.isRefreshing = false;
        //
        //     if (error.status == '403') {
        //       this.eventBusService.emit(new EventData('logout', null));
        //     }
        //
        //     return throwError(() => error);
        //   })
        // );
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
