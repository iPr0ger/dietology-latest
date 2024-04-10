import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {UserResponseInterface} from "../../../core/interfaces/account/user.interface";
import {PatientUserProfileResponseInterface} from "../../../core/interfaces/patient/patient.interface";
import {AccountService} from "../../../core/services/api/account.service";
import {UserStorageService} from "../../../core/services/storage/user-storage.service";
import {PatientService} from "../../../core/services/api/patient.service";
import {LoadScriptHelperService} from "../../../core/helpers/load-script-helper.service";


@Component({
  selector: 'user-lk',
  templateUrl: './user-lk.component.html',
})
export class UserLkComponent implements OnInit, AfterViewInit {
  userProfile: UserResponseInterface | undefined = undefined;
  clientProfile: PatientUserProfileResponseInterface | undefined = undefined;

  isLoading: boolean = false;

  isPrivateDataVisible: boolean = true;
  isFamilyDataVisible: boolean = false;
  isDiaryDataVisible: boolean = false;
  isFilesDataVisible: boolean = false;
  isConsultationDataVisible: boolean = false;

  isDayTableVisible: boolean = false;
  isWeekTableVisible: boolean = false;
  isMonthTableVisible: boolean = true;

  isCalendarVisible: boolean = true;
  isChartVisible: boolean = false;

  isWeekChartVisible: boolean = false;
  isMonthChartVisible: boolean = true;

  constructor(
    private accountService: AccountService,
    private userStorageService: UserStorageService,
    private patientService: PatientService,
    private scriptHelper: LoadScriptHelperService
  ) {

  }

  ngOnInit() {
    this.isLoading = true;
    this.accountService.getUserById(this.userStorageService.getUser().id).subscribe(response => {
      this.userProfile = response;
      this.patientService.getPatientProfile(this.userStorageService.getUser().id).subscribe(response => {
        this.clientProfile = response[0];
        this.isLoading = false;
      });
    });
  }

  ngAfterViewInit() {
    this.scriptHelper.loadJsScript("assets/js/chart-page.js");
  }

  showPrivateData() {
    this.isPrivateDataVisible = true;
    this.isFamilyDataVisible = false;
    this.isDiaryDataVisible = false;
    this.isFilesDataVisible = false;
    this.isConsultationDataVisible = false;
  }

  showFamilyData() {
    this.isPrivateDataVisible = false;
    this.isFamilyDataVisible = true;
    this.isDiaryDataVisible = false;
    this.isFilesDataVisible = false;
    this.isConsultationDataVisible = false;
  }

  showDiaryData() {
    this.isPrivateDataVisible = false;
    this.isFamilyDataVisible = false;
    this.isDiaryDataVisible = true;
    this.isFilesDataVisible = false;
    this.isConsultationDataVisible = false;
  }

  showFilesData() {
    this.isPrivateDataVisible = false;
    this.isFamilyDataVisible = false;
    this.isDiaryDataVisible = false;
    this.isFilesDataVisible = true;
    this.isConsultationDataVisible = false;
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

  showCalendar() {
    this.isCalendarVisible = true;
    this.isChartVisible = false;
  }

  showChart() {
    this.isCalendarVisible = false;
    this.isChartVisible = true;
  }

  showWeekChart() {
    this.isWeekChartVisible = true;
    this.isMonthChartVisible = false;
  }

  showMonthChart() {
    this.isWeekChartVisible = false;
    this.isMonthChartVisible = true;
  }

  showConsultationData() {
    this.isConsultationDataVisible = true;
    this.isPrivateDataVisible = false;
    this.isFamilyDataVisible = false;
    this.isDiaryDataVisible = false;
    this.isFilesDataVisible = false;
  }
}
