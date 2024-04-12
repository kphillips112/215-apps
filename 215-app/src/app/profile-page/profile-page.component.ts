import { Component } from '@angular/core';
import { ContactFooterComponent } from '../shared/contact-footer/contact-footer.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ContactFooterComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {}
