import {Component} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'diary-card-modal',
  templateUrl: './diary-card.modal.component.html',
  imports: [
    NgClass
  ],
  standalone: true
})
export class DiaryCardModalComponent {
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
