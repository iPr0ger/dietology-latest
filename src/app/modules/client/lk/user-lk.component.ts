import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {UserResponseInterface} from "../../../core/interfaces/account/user.interface";
import {PatientUserProfileResponseInterface} from "../../../core/interfaces/patient/patient.interface";
import {AccountService} from "../../../core/services/api/account.service";
import {UserStorageService} from "../../../core/services/storage/user-storage.service";
import {PatientService} from "../../../core/services/api/patient.service";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ChartComponent,
  ApexYAxis,
  ApexNoData
} from "ng-apexcharts";
import {LoadScriptHelperService} from "../../../core/helpers/load-script-helper.service";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  noData: ApexNoData
};

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

  isDayTableVisible: boolean = false;
  isWeekTableVisible: boolean = false;
  isMonthTableVisible: boolean = true;

  isCalendarVisible: boolean = true;
  isChartVisible: boolean = false;

  isWeekChartVisible: boolean = false;
  isMonthChartVisible: boolean = true;

  @ViewChild("chart", { static: false }) chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private accountService: AccountService,
    private userStorageService: UserStorageService,
    private patientService: PatientService,
    private scriptHelper: LoadScriptHelperService
  ) {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [1500, 2001, 1000, 1500, 500, 1000, 2000, 1500, 2000, 1600, 1500, 1300, 1500, 2000, 1200, 1500, 1800, 1500]
        }
      ],
      chart: {
        type: "bar",
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ['1, пт', '2, сб', '3, вс', '4, пн', '5, вт', '6, ср', '7, чт', '8, пт', '9, сб', '10, вс', '11, пн', '12, вт', '13, ср', '14, чт', '15, пт', '16, сб', '17, вс', '18, пн'],
      },
      noData: {
        text: "Loading...",
      },
      yaxis: {
        title: {
          text: "Ккал"
        },
        min: 0
      }
    };
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
}
