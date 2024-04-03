import {Component} from "@angular/core";

@Component({
  selector: 'medcard-component',
  templateUrl: './medcard.component.html',
})
export class MedcardComponent {
  title = 'dietology';

  isQuestionaireVisible: boolean = true;
  isRecomendationsVisible: boolean = false;
  isHistoryVisible: boolean = false;

  showQuestionaire() {
    this.isQuestionaireVisible = true;
    this.isRecomendationsVisible = false;
    this.isHistoryVisible = false;
  }

  showRecomendations() {
    this.isQuestionaireVisible = false;
    this.isRecomendationsVisible = true;
    this.isHistoryVisible = false;
  }

  showHistory() {
    this.isQuestionaireVisible = false;
    this.isRecomendationsVisible = false;
    this.isHistoryVisible = true;
  }
}
