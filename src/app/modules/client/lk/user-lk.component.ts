import {Component, OnInit} from "@angular/core";
import {UserResponseInterface} from "../../../core/interfaces/account/user.interface";
import {PatientUserProfileResponseInterface} from "../../../core/interfaces/patient/patient.interface";
import {AccountService} from "../../../core/services/api/account.service";
import {UserStorageService} from "../../../core/services/storage/user-storage.service";
import {PatientService} from "../../../core/services/api/patient.service";


@Component({
  selector: 'user-lk',
  templateUrl: './user-lk.component.html',
})
export class UserLkComponent implements OnInit {
  userProfile: UserResponseInterface | undefined = undefined;
  clientProfile: PatientUserProfileResponseInterface | undefined = undefined;

  isLoading: boolean = false;

  constructor(
    private accountService: AccountService,
    private userStorageService: UserStorageService,
    private patientService: PatientService,
  ) {

  }

  ngOnInit() {
    this.isLoading = true;
    this.accountService.getUserById(this.userStorageService.getUser().id).subscribe(response => {
      this.userProfile = response;

      console.log(this.userProfile);

      this.patientService.getPatientProfile(this.userStorageService.getUser().id).subscribe(response => {
        this.clientProfile = response;
        if (!this.clientProfile.photo?.includes('nutrusha.live')) {
          const mediaUrl = this.clientProfile.photo;
          this.clientProfile.photo = 'https://api.nutrisha.live' + mediaUrl;
        }

        this.isLoading = false;
      });
    });
  }
}
