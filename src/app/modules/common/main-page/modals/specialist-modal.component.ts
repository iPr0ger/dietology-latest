import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {SpecialistProfileResponseInterface} from "../../../../core/interfaces/specialist/specialist.interface";

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
