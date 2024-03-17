import {Component} from "@angular/core";
import {BaseAppConfig} from "../../../../core/configs/base-app.config";
import {UserStorageService} from "../../../../core/services/storage/user-storage.service";
import {TokenStorageService} from "../../../../core/services/storage/token-storage.service";
import {AuthService} from "../../../../core/services/api/auth.service";
import {SignInRequestInterface} from "../../../../core/interfaces/auth/auth.interface";
import {nextMonthDisabled} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";
import {FlashCallResponseInterface} from "../../../../core/interfaces/flashcall/flashcall.interface";

@Component({
  selector: 'auth-modal-component',
  templateUrl: './auth.modal.component.html',
})
export class AuthModalComponent {
  flashCallResponse: FlashCallResponseInterface | undefined = undefined;
  currentStep: number = 1;

  constructor(
    private userStorageService: UserStorageService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService
  ) {}

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
    this.authService.flashCall({phone: '79000000001'}).subscribe(data => {
        this.flashCallResponse = data;
        this.flashCallResponse.phone = '79000000001';
        this.currentStep = 2;
        console.log(this.currentStep);
      }
    );
    // this.reloadCurrentPage();
  }

  authorizeUser() {
    this.authService.signInWithPhoneAndConde(this.flashCallResponse!.phone, this.flashCallResponse!.code).subscribe(data => {
      console.log(data);
    })
  }

  goPreviousStep() {
    this.currentStep = 1;
  }

  reloadCurrentPage() {
    window.location.reload();
  }
}
