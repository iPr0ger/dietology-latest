import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('slider') slider: any;

  isDown = false;
  startX: number = 0;
  scrollLeft: number = 0;

  constructor() {
  }

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

  handleMousedown(event: MouseEvent) {
    this.isDown = true;
    this.slider.classList.add('active');
    this.startX = event.pageX - this.slider.nativeElement.offsetLeft;
    this.scrollLeft = this.slider.nativeElement.scrollLeft;
  }

  handleMouseup(event: MouseEvent) {
    this.isDown = false;
    this.slider.classList.remove('active');
  }

  handleMouseLeave(event: MouseEvent) {
    this.isDown = false;
    this.slider.classList.remove('active');
  }

  handleMousemove(event: MouseEvent) {
    if (!this.isDown) {
      return;
    }
    event.preventDefault();
    const x = event.pageX - this.slider.nativeElement.offsetLeft;
    this.slider.nativeElement.scrollLeft = this.scrollLeft + x - this.startX;
  }

  protected readonly event = event;
}
