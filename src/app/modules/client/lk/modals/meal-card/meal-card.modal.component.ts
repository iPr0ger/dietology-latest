import {Component} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'meal-card-modal',
  templateUrl: './meal-card.modal.component.html',
  imports: [
    NgClass
  ],
  standalone: true
})
export class MealCardModalComponent {
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
