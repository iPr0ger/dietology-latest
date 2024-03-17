import {NgModule} from "@angular/core";
import {AuthModalComponent} from "./auth/modals/auth.modal.component";
import {AuthComponent} from "./auth/auth.component";
import {ForgotPasswordModalComponent} from "./forgot-password/modals/forgot-password.modal.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {RegistrationModalComponent} from "./registration/modals/registration.modal.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthMainComponent} from "./auth-main.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {NgClass, NgIf} from "@angular/common";

@NgModule({
  declarations: [
    AuthMainComponent,
    AuthModalComponent,
    AuthComponent,
    ForgotPasswordModalComponent,
    ForgotPasswordComponent,
    RegistrationModalComponent,
    RegistrationComponent
  ],
    imports: [
        AuthRoutingModule,
        NgClass,
        NgIf
    ],
  exports: [
    AuthModalComponent
  ]
})
export class AuthModule {}
