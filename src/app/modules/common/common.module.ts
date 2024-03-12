import {NgModule} from "@angular/core";
import {ChatComponent} from "./chat/chat.component";
import {CommonMainComponent} from "./common-main.component";
import {CheckConnectionComponent} from "./check-connection/check-connection.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {SpecialistModalComponent} from "./main-page/modals/specialist-modal.component";
import {CallSettingsModalComponent} from "./online-meeting/modals/call-settings.modal.component";
import {OnlineMeetingComponent} from "./online-meeting/online-meeting.component";
import {LayoutModule} from "../../pages/layout.module";
import {CommonRoutingModule} from "./common-routing.module";
import {AsyncPipe, NgClass, NgIf, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    CommonMainComponent,
    ChatComponent,
    CheckConnectionComponent,
    MainPageComponent,
    SpecialistModalComponent,
    CallSettingsModalComponent,
    OnlineMeetingComponent,
  ],
  imports: [
    CommonRoutingModule,
    LayoutModule,
    NgClass,
    MatIcon,
    NgIf,
    NgStyle,
    AsyncPipe,
    MatGridList,
    MatGridTile
  ],
  exports: []
})
export class CommonModule {}
