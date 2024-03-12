import {
  Component, OnInit
} from "@angular/core";
import {AuthService} from "../../../core/services/auth.service";
import {UserResponseInterface} from "../../../core/interfaces/account/user.interface";
import {UserStorageService} from "../../../core/services/storage/user-storage.service";
import {BaseAppConfig} from "../../../core/configs/base-app.config";
import {SignInRequestInterface, TokenResponseInterface} from "../../../core/interfaces/auth/sign-in.interface";
import {TokenStorageService} from "../../../core/services/storage/token-storage.service";

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

  setUserAuthorized(token: TokenResponseInterface) {
    let user = {
      id: '121212',
      password: '<PASSWORD>',
      last_login: 'yesterday',
      is_superuser: true,
      username: 'user',
      is_email_verified: true,
      is_specialist: false,
      is_patient: true,
      is_hr: false,
      first_name: 'Сергей',
      last_name: 'Горянин',
      email: 'admin@mail.ru',
      phone: '+7999999999',
      is_staff: false,
      is_active: true,
    };
    this.userStorageService.saveUser(user);
    this.tokenStorageService.saveToken(token);
    this.reloadCurrentPage();
  }

  login(){
    const signInReq: SignInRequestInterface = {
      username: BaseAppConfig.systemUserName,
      password: BaseAppConfig.systemUserPassword
    }
    this.authService.login(signInReq).subscribe(data => {
      this.setUserAuthorized(data);
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
