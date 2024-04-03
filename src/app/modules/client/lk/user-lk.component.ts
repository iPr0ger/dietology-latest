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

  isPrivateDataVisible: boolean = true;
  isFamilyDataVisible: boolean = false;
  isDiaryDataVisible: boolean = false;
  isFilesDataVisible: boolean = false;

  isDayTableVisible: boolean = false;
  isWeekTableVisible: boolean = false;
  isMonthTableVisible: boolean = true;

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



      this.patientService.getPatientProfile(this.userStorageService.getUser().id).subscribe(response => {
        this.clientProfile = response[0];
        // if (!this.clientProfile.photo?.includes('nutrusha.live')) {
        //   const mediaUrl = this.clientProfile.photo;
        //   this.clientProfile.photo = 'https://api.nutrisha.live' + mediaUrl;
        // }

        console.log(this.userProfile);
        console.log(this.clientProfile);

        this.isLoading = false;
      });
    });
  }

  showPrivateData() {
    this.isPrivateDataVisible = true;
    this.isFamilyDataVisible = false;
    this.isDiaryDataVisible = false;
    this.isFilesDataVisible = false;
  }

  showFamilyData() {
    this.isPrivateDataVisible = false;
    this.isFamilyDataVisible = true;
    this.isDiaryDataVisible = false;
    this.isFilesDataVisible = false;
  }

  showDiaryData() {
    this.isPrivateDataVisible = false;
    this.isFamilyDataVisible = false;
    this.isDiaryDataVisible = true;
    this.isFilesDataVisible = false;
  }

  showFilesData() {
    this.isPrivateDataVisible = false;
    this.isFamilyDataVisible = false;
    this.isDiaryDataVisible = false;
    this.isFilesDataVisible = true;
  }

  showDayTable() {
    this.isDayTableVisible = true;
    this.isWeekTableVisible = false;
    this.isMonthTableVisible = false;
  }

  showWeekTable() {
    this.isDayTableVisible = false;
    this.isWeekTableVisible = true;
    this.isMonthTableVisible = false;
  }

  showMonthTable() {
    this.isDayTableVisible = false;
    this.isWeekTableVisible = false;
    this.isMonthTableVisible = true;
  }
}
