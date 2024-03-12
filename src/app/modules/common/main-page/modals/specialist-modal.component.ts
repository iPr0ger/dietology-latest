import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SpecialistProfileResponseInterface} from "../../../../core/interfaces/account/specialist-profile.interface";

@Component({
  selector: 'specialist-modal',
  templateUrl: './specialist-modal.component.html',
})
export class SpecialistModalComponent implements AfterViewInit{
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

  ngAfterViewInit() {
    let node = document.createElement('script');
    node.src = "./assets/js/review-scroll.js";//Change to your js file
    node.type = 'text/javascript';
    node.async = true;
    document.getElementsByTagName('body')[0].appendChild(node);
  }
}
