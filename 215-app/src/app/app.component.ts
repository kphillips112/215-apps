import { CommonModule, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SiteNavigationComponent } from "./site-navigation/site-navigation.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BreakpointService } from "./breakpoint.service";
import { Observable } from "rxjs";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SiteNavigationComponent,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    NgIf,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit{
  title = "215-app";
  showHamburger = true;
  showHandsetMenu = false;
  isHandset$!: Observable<boolean> 

  constructor(private breakpointService: BreakpointService) {
    //this constructor is used to inject the BreakpointService into the component
    //it is marked as private so that it can be used within the component
    //we now can access it within the component with this.breakpointService
  }

  ngOnInit(): void {
   

    //subscribe to the isHandset$ observable to get the current screen size
    this.isHandset$ = this.breakpointService.isHandsetPortrait$;

    this.isHandset$.subscribe((isHandset) => {
      if (!isHandset) {
        this.showHamburger = false;
        this.showHandsetMenu = false;
      } else {
        this.showHamburger = true;
      }
    });
  }

  toggleHandsetMenu() {
    this.showHandsetMenu = !this.showHandsetMenu;
  }
}
