import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserStorageService} from "../services/storage/user-storage.service";

@Injectable({providedIn: 'root'})
export class AuthGuard {
  constructor(private userStorage: UserStorageService, private router: Router) {}

  canActivate(): boolean {
    if (!this.userStorage.isLoggedIn()) {
      this.router.navigate(['/main']);
      return false;
    }
    return true;
  }
}
