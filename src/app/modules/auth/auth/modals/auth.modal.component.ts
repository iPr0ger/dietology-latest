import {Component} from "@angular/core";
import {SignInRequestInterface, TokenResponseInterface} from "../../../../core/interfaces/auth/sign-in.interface";
import {BaseAppConfig} from "../../../../core/configs/base-app.config";
import {UserStorageService} from "../../../../core/services/storage/user-storage.service";
import {TokenStorageService} from "../../../../core/services/storage/token-storage.service";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'auth-modal-component',
  templateUrl: './auth.modal.component.html',
})
export class AuthModalComponent {
  constructor(
    private userStorageService: UserStorageService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService
  ) {
  }

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
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
