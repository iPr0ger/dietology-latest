import {Component, ViewChild} from '@angular/core';
import {NgClass} from "@angular/common";
import {QuestionaireModalComponent} from "../questionaire/questionaire-modal.component";

@Component({
  selector: 'service-modal',
  templateUrl: './service-modal.component.html',
  imports: [
    NgClass,
    QuestionaireModalComponent
  ],
  standalone: true
})
export class ServiceModalComponent {
  @ViewChild('questionaireModalComponent') questionaireModalComponent!: QuestionaireModalComponent;

  constructor() {
  }

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

  openQuestionaireModal() {
    this.questionaireModalComponent.openModal();
    this.isModalOpen = false;
  }
}
