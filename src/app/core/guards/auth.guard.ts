import {inject} from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";
import {UserStorageService} from "../services/storage/user-storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";

export const authGuard: CanActivateFn = (route, state) => {
  const userStorageService = inject(UserStorageService);
  const router = inject(Router);
  const jwtHelperService = inject(JwtHelperService);
  if (!userStorageService.isLoggedIn() && !jwtHelperService.isTokenExpired()) {
    router.navigate(['/common/main']);
    return false;
  }
  return true;
};
