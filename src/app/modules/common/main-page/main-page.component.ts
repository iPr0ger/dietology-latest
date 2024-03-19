import { Component } from "@angular/core";
import {SpecialistProfileResponseInterface} from "../../../core/interfaces/specialist/specialist.interface";
import {AccountService} from "../../../core/services/api/account.service";
import {ScheduleService} from "../../../core/services/api/schedule.service";
import {SpecialistService} from "../../../core/services/api/specialist.service";


export enum DateTimeType {
  DATE = "date",
  TIME = "time"
}

export interface AppointmentValue {
  isSelected: boolean;
  type: DateTimeType;
  value: string;
  times: AppointmentValue[] | null;
}

export interface SpecialistMainPageDetailsInterface {
  specialistProfile: SpecialistProfileResponseInterface;
  appointment: AppointmentValue[];
  selectedAppointmentIndex: number;
}

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  specialists: SpecialistMainPageDetailsInterface[] = [];
  isLoading: boolean = true;

  constructor(
    private accountService: AccountService,
    private scheduleService: ScheduleService,
    private specialistService: SpecialistService
  ) {
    this.specialists = [];
    this.isLoading = true;
    this.specialistService.getSpecialistProfiles().subscribe(data => {
      data.forEach(specialist => {
        if (!specialist.photo.includes('nutrusha.live')) {
          const mediaUrl = specialist.photo;
          specialist.photo = 'https://api.nutrisha.live' + mediaUrl;
        }
        this.scheduleService.getDoctorRecentDates(specialist.doctor?.id!).subscribe(data => {
          let appointments: AppointmentValue[] = [];
          for (const [key, value] of Object.entries(data)) {
            appointments.push({
              isSelected: key === Object.keys(data)[0],
              type: DateTimeType.DATE,
              value: key,
              times: value.map((time, index) => ({
                isSelected: index == 0,
                type: DateTimeType.TIME,
                value: time,
                times: []
              }))
            });
          }
          this.specialists.push({
            specialistProfile: specialist,
            appointment: appointments,
            selectedAppointmentIndex: 0
          })
          this.isLoading = false;
        })
      })
    });
  }
}
