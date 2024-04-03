import {Component} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'chat-modal',
  templateUrl: './chat-modal.component.html',
  imports: [
    NgClass
  ],
  standalone: true
})
export class ChatModalComponent {
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
