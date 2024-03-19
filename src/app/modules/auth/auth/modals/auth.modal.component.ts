import {Component, ViewChild} from "@angular/core";
import {BaseAppConfig} from "../../../../core/configs/base-app.config";
import {UserStorageService} from "../../../../core/services/storage/user-storage.service";
import {TokenStorageService} from "../../../../core/services/storage/token-storage.service";
import {AuthService} from "../../../../core/services/api/auth.service";
import {SignInRequestInterface} from "../../../../core/interfaces/auth/auth.interface";
import {
  FlashCallResponseInterface,
  FlashCallTokenResponseInterface
} from "../../../../core/interfaces/flashcall/flashcall.interface";
import {AccountService} from "../../../../core/services/api/account.service";
import {SpecialistService} from "../../../../core/services/api/specialist.service";
import {PatientService} from "../../../../core/services/api/patient.service";

@Component({
  selector: 'auth-modal-component',
  templateUrl: './auth.modal.component.html',
})
export class AuthModalComponent {
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
  ) {}

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

  setUserAuthorized(data: FlashCallTokenResponseInterface) {
    this.accountService.getUserById(data.user_id).subscribe(response => {
      this.userStorageService.saveUser(response);
      if (response.is_specialist) {
        this.specialistService.getSpecialistProfileById(response.id).subscribe(response => {
          this.userStorageService.saveIsClient(false);
          this.userStorageService.saveIsSpecialist(true);
          this.userStorageService.saveSpecialistDetails(response);

          this.tokenStorageService.saveToken({access: data.access, refresh: data.refresh});
          this.reloadCurrentPage();
        },
        error => {
          this.userStorageService.saveIsClient(false);
          this.userStorageService.saveIsSpecialist(true);

          this.tokenStorageService.saveToken({access: data.access, refresh: data.refresh});
          this.reloadCurrentPage();
        });
      }
      else{
        this.patientService.getPatientProfile(response.id).subscribe(response => {
          this.userStorageService.saveIsClient(true);
          this.userStorageService.saveIsSpecialist(false);
          this.userStorageService.saveClientDetails(response);

          this.tokenStorageService.saveToken({access: data.access, refresh: data.refresh});
          this.reloadCurrentPage();
        },
        error => {
          this.userStorageService.saveIsClient(true);
          this.userStorageService.saveIsSpecialist(false);

          this.tokenStorageService.saveToken({access: data.access, refresh: data.refresh});
          this.reloadCurrentPage();
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

  reloadCurrentPage() {
    window.location.reload();
  }
}
