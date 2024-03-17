import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserStorageService} from "../services/storage/user-storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({providedIn: 'root'})
export class AuthGuard {
  constructor(
    private userStorage: UserStorageService,
    private router: Router,
    private jwtHelperService: JwtHelperService
  ) {}

  canActivate(): boolean {
    if (!this.userStorage.isLoggedIn() && !this.jwtHelperService.isTokenExpired()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
