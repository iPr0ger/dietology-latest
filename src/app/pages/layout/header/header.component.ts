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
    }
  }

  logout() {
    this.userStorageService.logOut();
    this.reloadCurrentPage();
  }

  setUserAuthorized() {
    const user: UserResponseInterface = {
      id: '12121212121',
      password: 'pswd',
      username: 'username',
      first_name: 'Сергей',
      last_name: 'Горянин',
      email: 'admin@localhost',
      phone: '7912'
    }
    this.userStorageService.saveUser(user);
    // this.tokenStorageService.saveToken();
    this.reloadCurrentPage();
  }

  login(){
    const signInReq: SignInRequestInterface = {
      username: BaseAppConfig.systemUserName,
      password: BaseAppConfig.systemUserPassword
    }
    this.authService.signIn(signInReq).subscribe(data => {
      this.setUserAuthorized();
      console.log(data);
    }, error => {
      console.log(error);
    });
    // this.reloadCurrentPage();
  }

  reloadCurrentPage() {
    window.location.reload();
  }
}
