import {NgModule} from "@angular/core";
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {NgClass} from "@angular/common";
import {AuthModule} from "../modules/auth/auth.module";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    NgClass,
    AuthModule,
    RouterLink
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule {}
