import {
  Component, OnInit
} from "@angular/core";
import {UserResponseInterface} from "../../../core/interfaces/account/user.interface";
import {UserStorageService} from "../../../core/services/storage/user-storage.service";
import {BaseAppConfig} from "../../../core/configs/base-app.config";
import {TokenStorageService} from "../../../core/services/storage/token-storage.service";
import {AuthService} from "../../../core/services/api/auth.service";
import {TokenResponseInterface} from "../../../core/interfaces/token/token.interface";
import {SignInRequestInterface} from "../../../core/interfaces/auth/auth.interface";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthorized: boolean = false;
  userState: UserResponseInterface | null = null;
  photoUrl: string | null = null;

  locations: string[] = [
    'Москва',
    'Санкт-Петербург',
    'Екатеринбург'
  ]

  currentLocation: string = this.locations[0];

  constructor(
    private authService: AuthService,
    private userStorageService: UserStorageService,
    private tokenStorageService: TokenStorageService
  ) {}

  isLocationOpened: boolean = false;
  isUserMenuOpened: boolean = false;
  isMenuOpened: boolean = false;

  ngOnInit() {
    this.isAuthorized = this.userStorageService.isLoggedIn();
    if (this.isAuthorized) {
      this.userState = this.userStorageService.getUser();
      if (this.userState.is_patient) {
        this.photoUrl = this.userStorageService.getClientDetails().photo;
      }
      else if (this.userState.is_specialist) {
        this.photoUrl = this.userStorageService.getSpecialistDetails().photo;
      }
    }
  }

  logout() {
    this.userStorageService.logOut();
    this.reloadCurrentPage();
  }

  reloadCurrentPage() {
    window.location.reload();
  }

  changeLocation(location: string) {
    this.currentLocation = location;
    this.isLocationOpened = false;
  }
}
