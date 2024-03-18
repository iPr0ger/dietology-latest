import {Component} from "@angular/core";

@Component({
  selector: 'registration-component',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  title = 'dietology';

  currentStep: number = 1;

  goToStep(step: number): number {
    this.currentStep = step;
    return this.currentStep;
  }
}
