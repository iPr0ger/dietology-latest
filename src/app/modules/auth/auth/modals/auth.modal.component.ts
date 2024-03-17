import {Component} from "@angular/core";
import {BaseAppConfig} from "../../../../core/configs/base-app.config";
import {UserStorageService} from "../../../../core/services/storage/user-storage.service";
import {TokenStorageService} from "../../../../core/services/storage/token-storage.service";
import {AuthService} from "../../../../core/services/api/auth.service";
import {SignInRequestInterface} from "../../../../core/interfaces/auth/auth.interface";

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

  setUserAuthorized() {
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
    this.tokenStorageService.saveToken({
      access: '121212',
      refresh: '121212',
    });
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
