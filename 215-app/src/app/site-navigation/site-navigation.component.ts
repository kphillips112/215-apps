import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-site-navigation",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: "./site-navigation.component.html",
  styleUrl: "./site-navigation.component.css",
})
export class SiteNavigationComponent {}
