import {Component, ViewChild} from "@angular/core";
import {UserStorageService} from "../../../core/services/storage/user-storage.service";
import {TokenStorageService} from "../../../core/services/storage/token-storage.service";
import {AuthService} from "../../../core/services/api/auth.service";
import {AccountService} from "../../../core/services/api/account.service";
import {PatientService} from "../../../core/services/api/patient.service";
import {SpecialistService} from "../../../core/services/api/specialist.service";
import {
  FlashCallResponseInterface,
  FlashCallTokenResponseInterface
} from "../../../core/interfaces/flashcall/flashcall.interface";
import {SignInRequestInterface} from "../../../core/interfaces/auth/auth.interface";
import {BaseAppConfig} from "../../../core/configs/base-app.config";
import {Router} from "@angular/router";

@Component({
  selector: 'auth-component',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  @ViewChild('phoneNumber') phoneNumber: any;

  flashCallResponse: FlashCallResponseInterface | undefined = undefined;
  currentStep: number = 1;
  defaultPhoneNumber: string = '79000000001';

  constructor(
    private userStorageService: UserStorageService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private accountService: AccountService,
    private patientService: PatientService,
    private specialistService: SpecialistService,
    private router: Router
  ) {}

  setUserAuthorized(data: FlashCallTokenResponseInterface) {
    this.accountService.getUserById(data.user_id).subscribe(response => {
      this.userStorageService.saveUser(response);
      if (response.is_specialist) {
        this.specialistService.getSpecialistProfileById(response.id).subscribe(response => {
            this.userStorageService.saveIsClient(false);
            this.userStorageService.saveIsSpecialist(true);
            this.userStorageService.saveSpecialistDetails(response[0]);

            this.tokenStorageService.saveToken({access: data.access, refresh: data.refresh});
            this.router.navigate(['']);
          },
          error => {
            this.userStorageService.saveIsClient(false);
            this.userStorageService.saveIsSpecialist(true);

            this.tokenStorageService.saveToken({access: data.access, refresh: data.refresh});
            this.router.navigate(['']);
          });
      }
      else{
        this.patientService.getPatientProfile(response.id).subscribe(response => {
            this.userStorageService.saveIsClient(true);
            this.userStorageService.saveIsSpecialist(false);
            this.userStorageService.saveClientDetails(response[0]);

            this.tokenStorageService.saveToken({access: data.access, refresh: data.refresh});
            this.router.navigate(['']);
          },
          error => {
            this.userStorageService.saveIsClient(true);
            this.userStorageService.saveIsSpecialist(false);

            this.tokenStorageService.saveToken({access: data.access, refresh: data.refresh});
            this.router.navigate(['']);
          });
      }
    })
  }

  login(){
    let phone = null;
    if (this.phoneNumber) {
      phone = this.phoneNumber.nativeElement.value.replace('+7', '7');
    }
    else{
      phone = this.defaultPhoneNumber;
    }
    this.authService.flashCall({phone: phone}).subscribe(data => {
        this.flashCallResponse = data;
        this.flashCallResponse.phone = this.defaultPhoneNumber;
        this.currentStep = 2;
      }
    );
    // this.reloadCurrentPage();
  }

  authorizeUser() {
    this.authService.signInWithPhoneAndCode(this.flashCallResponse!.phone, this.flashCallResponse!.code).subscribe(data => {
      this.setUserAuthorized(data);
    })
  }

  goPreviousStep() {
    this.currentStep = 1;
  }
}
