import {Component, Input, OnInit} from "@angular/core";


@Component({
  selector: 'patient-data',
  templateUrl: './patient-data.component.html',
})
export class PatientDataComponent implements OnInit {
  @Input() isShown: boolean = false;

  isQuestionVisible: boolean = true;
  isRecommendationsVisible: boolean = false;

  constructor() {}

  ngOnInit() {
  }

  toggle() {
    this.isShown =!this.isShown;
  }

  showRecommendations() {
    this.isRecommendationsVisible = true;
    this.isQuestionVisible = false;
  }

  showQuestions() {
    this.isRecommendationsVisible = false;
    this.isQuestionVisible = true;
  }
}
