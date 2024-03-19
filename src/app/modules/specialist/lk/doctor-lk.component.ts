import {Component, OnInit} from "@angular/core";
import {UserResponseInterface} from "../../../core/interfaces/account/user.interface";
import {
  SpecialistEducationResponseInterface,
  SpecialistProfileResponseInterface, SpecialistWorkingExperienceResponseInterface
} from "../../../core/interfaces/specialist/specialist.interface";
import {AccountService} from "../../../core/services/api/account.service";
import {UserStorageService} from "../../../core/services/storage/user-storage.service";
import {SpecialistService} from "../../../core/services/api/specialist.service";
import {DocumentResponseInterface} from "../../../core/interfaces/account/document.interface";
import {forkJoin} from "rxjs";


@Component({
  selector: 'doctor-lk',
  templateUrl: './doctor-lk.component.html',
})
export class DoctorLkComponent implements OnInit {
  userProfile: UserResponseInterface | undefined = undefined;
  specialistProfile: SpecialistProfileResponseInterface | undefined = undefined;
  specialistEducation: SpecialistEducationResponseInterface[] | undefined = undefined;
  specialistWorkExperience: SpecialistWorkingExperienceResponseInterface[] | undefined = undefined;
  specialistDocs: DocumentResponseInterface[] | undefined = undefined;

  isLoading: boolean = false;

  constructor(
    private accountService: AccountService,
    private userStorageService: UserStorageService,
    private specialistService: SpecialistService,
  ) {

  }

  ngOnInit() {
    this.isLoading = true;

    forkJoin(
      this.accountService.getUserById(this.userStorageService.getUser().id),
      this.specialistService.getSpecialistProfileById(this.userStorageService.getUser().id),
      this.specialistService.getSpecialistEducations(this.userStorageService.getUser().id),
      this.specialistService.getSpecialistWorkingExperience(this.userStorageService.getUser().id),
      this.accountService.getUserDocuments(this.userStorageService.getUser().id)
    ).subscribe(([userProfile, specialistProfile, specialistEducation, specialistWorkExperience, specialistDocs]) => {
      this.userProfile = userProfile;
      this.specialistProfile = specialistProfile[0];
      this.specialistEducation = specialistEducation;
      this.specialistWorkExperience = specialistWorkExperience;
      this.specialistDocs = specialistDocs;
      this.isLoading = false;

      console.log(this.userProfile);
      console.log(this.specialistProfile);
      console.log(this.specialistEducation);
      console.log(this.specialistWorkExperience);
      console.log(this.specialistDocs);
    })
  }
}
