import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";
import {UserStorageService} from "../services/storage/user-storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenStorageService} from "../services/storage/token-storage.service";

export const authGuard: CanActivateFn = (route, state) => {
  const userStorageService = inject(UserStorageService);
  const tokenStorageService = inject(TokenStorageService);
  const router = inject(Router);
  const jwtHelperService = inject(JwtHelperService);
  if (userStorageService.isLoggedIn() && tokenStorageService.getToken() && tokenStorageService.getToken().access) {
    if (!jwtHelperService.isTokenExpired(tokenStorageService.getToken().access)){
      return true;
    }
  }
  router.navigate(['']);
  return false;
};
