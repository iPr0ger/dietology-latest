import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SpecialistProfileResponseInterface} from "../../../../core/interfaces/account/specialist-profile.interface";
import {NgClass} from "@angular/common";

@Component({
  selector: 'specialist-modal',
  templateUrl: './specialist-modal.component.html',
  imports: [
    NgClass
  ],
  standalone: true
})
export class SpecialistModalComponent {
  @Input() specialist: SpecialistProfileResponseInterface | null = null;

  constructor() {
  }

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }
}
