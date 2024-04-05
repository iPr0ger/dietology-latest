import {Component, Input, ViewChild} from '@angular/core';
import {NgClass} from "@angular/common";
import {CommonModule} from "../../../../common/common.module";

@Component({
  selector: 'call-with-patient-modal',
  templateUrl: './call-with-patient-modal.component.html',
  imports: [
    NgClass,
    CommonModule
  ],
  standalone: true
})
export class CallWithPatientModalComponent {
  constructor() {
  }

  isModalOpen: boolean = true;

  isCallWithPatientVisible: boolean = true;
  isQuestionareVisible: boolean = false;
  isDiaryVisible: boolean = false;
  isFullScreenVisible: boolean = false;

  toggleFullScreen() {
    this.isFullScreenVisible =!this.isFullScreenVisible;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

  showCallWithPatient(){
    this.isCallWithPatientVisible = true;
    this.isQuestionareVisible = false;
    this.isDiaryVisible = false;
  }

  showQuestionaire(){
    this.isCallWithPatientVisible = false;
    this.isQuestionareVisible = true;
    this.isDiaryVisible = false;
  }

  showDiary(){
    this.isCallWithPatientVisible = false;
    this.isQuestionareVisible = false;
    this.isDiaryVisible = true;
  }
}
