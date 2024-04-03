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

  tempEducations: Array<string> = [];
  tempWorkExperience: Array<string> = [];

  isPrivateDataVisible: boolean = true;
  isConsultationVisible: boolean = false;
  isPatientsVisible: boolean = false;

  constructor(
    private accountService: AccountService,
    private userStorageService: UserStorageService,
    private specialistService: SpecialistService,
  ) {}

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

      if (this.specialistEducation?.length > 0){
        this.tempEducations = this.specialistEducation.map(education => education.id);
      }
      else{
        this.tempEducations.push('1');
      }

      if (this.specialistWorkExperience?.length > 0){
        this.tempWorkExperience = this.specialistWorkExperience.map(education => education.id);
      }
      else{
        this.tempWorkExperience.push('1');
      }

      this.isLoading = false;

      console.log(this.userProfile);
      console.log(this.specialistProfile);
      console.log(this.specialistEducation);
      console.log(this.specialistWorkExperience);
      console.log(this.specialistDocs);
    })
  }

  addEducation(){
    this.tempEducations.push('1');
  }

  removeEducation(index: number){
    this.tempEducations.splice(index, 1);
  }

  addWorkExperience(){
    this.tempWorkExperience.push('1');
  }

  removeWorkExperience(index: number){
    this.tempWorkExperience.splice(index, 1);
  }

  showConsultation(){
    this.isConsultationVisible = true;
    this.isPatientsVisible = false;
    this.isPrivateDataVisible = false;
  }

  showPatients(){
    this.isConsultationVisible = false;
    this.isPatientsVisible = true;
    this.isPrivateDataVisible = false;
  }

  showPrivateData(){
    this.isConsultationVisible = false;
    this.isPatientsVisible = false;
    this.isPrivateDataVisible = true;
  }

  isDayTableVisible: boolean = false;
  isWeekTableVisible: boolean = false;
  isMonthTableVisible: boolean = true;

  showDayTable(){
    this.isDayTableVisible = true;
    this.isWeekTableVisible = false;
    this.isMonthTableVisible = false;
  }

  showWeekTable(){
    this.isDayTableVisible = false;
    this.isWeekTableVisible = true;
    this.isMonthTableVisible = false;
  }

  showMonthTable(){
    this.isDayTableVisible = false;
    this.isWeekTableVisible = false;
    this.isMonthTableVisible = true;
  }
}
