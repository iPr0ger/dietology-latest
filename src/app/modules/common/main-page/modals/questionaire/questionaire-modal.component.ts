import { Component } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'questionaire-modal',
  templateUrl: './questionaire-modal.component.html',
  imports: [
    NgClass
  ],
  standalone: true
})
export class QuestionaireModalComponent {
  constructor() {
  }

  quizStep: number = 1;
  quizMinStep: number = 1;
  quizMaxStep: number = 10;
  isModalOpen: boolean = false;

  goQuizNextStep() {
    if (this.quizStep < this.quizMaxStep) {
      this.quizStep++;
    }
    else {
      this.quizStep = this.quizMaxStep;
    }
  }

  goQuizPrevStep() {
    if (this.quizStep > this.quizMinStep) {
      this.quizStep--;
    }
    else{
      this.quizStep = this.quizMinStep;
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }
}
