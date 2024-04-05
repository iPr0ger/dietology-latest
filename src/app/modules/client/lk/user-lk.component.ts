import {Component, OnInit, ViewChild} from "@angular/core";
import {UserResponseInterface} from "../../../core/interfaces/account/user.interface";
import {PatientUserProfileResponseInterface} from "../../../core/interfaces/patient/patient.interface";
import {AccountService} from "../../../core/services/api/account.service";
import {UserStorageService} from "../../../core/services/storage/user-storage.service";
import {PatientService} from "../../../core/services/api/patient.service";
import {LoadScriptHelperService} from "../../../core/helpers/load-script-helper.service";
import {ApexChart, ChartComponent} from "ng-apexcharts";


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

  isCalendarVisible: boolean = true;
  isChartVisible: boolean = false;

  data1 = [1500, 2001, 1000, 1500, 500, 1000, 2000, 1500, 2000, 1600, 1500, 1300, 1500, 2000, 1200, 1500, 1800, 1500]
  bgcolor1: string[] = this.populateBgColors1()
  bordercolor1: string[] = this.populateBorderColors1()



  monthChart: ApexChart = {
    type: 'bar',
    data: {
      labels: ['1, пт', '2, сб', '3, вс', '4, пн', '5, вт', '6, ср', '7, чт', '8, пт', '9, сб', '10, вс', '11, пн', '12, вт', '13, ср', '14, чт', '15, пт', '16, сб', '17, вс', '18, пн'],
      datasets: [{
        label: 'Ккал',
        data: this.data1,
        backgroundColor: this.bgcolor1,
        borderColor: this.bordercolor1,
        borderWidth: 2,
        borderRadius: {
          topLeft: 20,
          topRight: 20
        },
        borderSkipped: false,
        min: 4000,
      }]
    },
    options: {
      hover: {mode: null},
      animation: {
        duration: 0
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: (context: any) => {
              if(context.tick.value == 1500) {
                return '#27AE60'
              } else {
                return '#F1F1F1'
              }
            }
          },
          ticks: {
            //@ts-ignore
            callback: function(value, index, ticks) {
              return value + ' ккал';
            },
            font: {
              family: "Manrope",
              size: 16,
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: "Manrope",
              size: 16,
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
          position: 'nearest',
          external: externalTooltipHandler
        }
      }
    }
  };
  // weekChart: ApexChart = {};

  constructor(
    private accountService: AccountService,
    private userStorageService: UserStorageService,
    private patientService: PatientService,
    private scriptHelperService: LoadScriptHelperService
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

  populateBgColors1(): string[]{
    let colors: string[] = []
    for (let i=0; i<this.data1.length; i++) {
      if (this.data1[i]>1500 || this.data1[i]<1500) {
        this.bgcolor1.push('#FEEDED')
      } else {
        this.bgcolor1.push('#27AE60')
      }
    }
    return colors;
  }
  populateBorderColors1(): string[] {
    let colors: string[] = []
    for (let i=0; i<this.data1.length; i++) {
      if (this.data1[i]>1500 || this.data1[i]<1500) {
        colors.push('#EB5757')
      } else {
        colors.push('#27AE60')
      }
    }
    return colors;
  }
}

export const getOrCreateTooltip = (chart: any) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.classList.add('chartjs-tooltip')

    const table = document.createElement('table');

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler = (context: any) => {
  // Tooltip Element
  const {chart, tooltip} = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    //@ts-ignore
    const bodyLines = tooltip.body.map(b => b.lines);

    const tableHead = document.createElement('thead');

    //@ts-ignore
    titleLines.forEach(title => {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      if (tooltip.dataPoints[0].raw > 1500) {
        th.classList.add('warning')
        th.innerHTML = `
            <div style='display: flex; flex-direction: column;'>
            <span class='title'>Перебор</span>
            <span>Лишние ${tooltip.dataPoints[0].raw - 1500} ккал</span>
            <div>
        `
      } else {
        if(tooltip.dataPoints[0].raw == 1500) {
          th.classList.add('complete')
          th.innerHTML = `<span class='title'>Идеально</span>`
        } else {
          th.classList.add('warning')
          th.innerHTML = `
            <div style='display: flex; flex-direction: column;'>
            <span class='title'>Недостаточно</span>
            <span>Ещё ${1500 - tooltip.dataPoints[0].raw} ккал</span>
            </div>
        `
        }
      }
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    //@ts-ignore
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];
      //span.style.background = colors.backgroundColor;


      const tr = document.createElement('tr');

      const td = document.createElement('td');
      let text = document.createElement('p')
      text.innerHTML = body
      text.classList.add('text-s')
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};
