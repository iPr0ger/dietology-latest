import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {StatesService} from "../services/states.service";

@Injectable({providedIn: 'root'})
export class AuthGuard {
  constructor(private stateService: StatesService, private router: Router) {}

  canActivate(): boolean {
    if (!this.stateService.isUserAuthorized) {
      this.router.navigate(['/main']);
      return false;
    }
    return true;
  }
}
