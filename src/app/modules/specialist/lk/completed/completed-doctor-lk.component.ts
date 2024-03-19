import {Component, OnInit} from "@angular/core";
import {UserResponseInterface} from "../../../../core/interfaces/account/user.interface";
import {AccountService} from "../../../../core/services/api/account.service";
import {UserStorageService} from "../../../../core/services/storage/user-storage.service";
import {PatientService} from "../../../../core/services/api/patient.service";
import {SpecialistProfileResponseInterface} from "../../../../core/interfaces/specialist/specialist.interface";
import {SpecialistService} from "../../../../core/services/api/specialist.service";

@Component({
  selector: 'completed-doctor-lk',
  templateUrl: './completed-doctor-lk.component.html',
})
export class CompletedDoctorLkComponent implements OnInit {
  userProfile: UserResponseInterface | undefined = undefined;
  specialistProfile: SpecialistProfileResponseInterface | undefined = undefined;

  isLoading: boolean = false;

  constructor(
    private accountService: AccountService,
    private userStorageService: UserStorageService,
    private specialistService: SpecialistService,
  ) {

  }

  ngOnInit() {
    this.isLoading = true;
    this.accountService.getUserById(this.userStorageService.getUser().id).subscribe(response => {
      this.userProfile = response;


      this.specialistService.getSpecialistProfileById(this.userStorageService.getUser().id).subscribe(response => {
        this.specialistProfile = response[0];
        if (!this.specialistProfile.photo?.includes('nutrusha.live')) {
          const mediaUrl = this.specialistProfile.photo;
          this.specialistProfile.photo = 'https://api.nutrisha.live' + mediaUrl;
        }

        console.log(this.userProfile);
        console.log(this.specialistProfile);

        this.isLoading = false;
      });
    });
  }
}
