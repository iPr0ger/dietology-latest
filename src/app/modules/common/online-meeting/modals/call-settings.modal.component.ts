import {Component} from "@angular/core";

@Component({
  selector: 'call-settings-modal',
  templateUrl: './call-settings.modal.component.html',
})
export class CallSettingsModalComponent {
  title = 'dietology';

  isModalOpen: boolean = false;

  isMicrophoneMenuOpened: boolean = false;
  isCameraMenuOpened: boolean = false;
  isOutputMenuOpened: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }
}
