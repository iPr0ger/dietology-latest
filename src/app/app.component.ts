import {AfterViewInit, Component, ElementRef, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {UserStorageService} from "./core/services/storage/user-storage.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'dietology';
  eventBusSub?: Subscription;


  constructor(
    private elementRef: ElementRef,
    private userStorageService: UserStorageService,
  ) {}

  ngOnInit() {
    // this.eventBusSub = this.eventBusService.on('logout', () => {
    //   this.logout();
    // });
  }

  ngAfterViewInit() {

  }

  logout(): void {
    this.userStorageService.logOut();
  }


}
