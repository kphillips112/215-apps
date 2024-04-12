import { Component } from '@angular/core';
import { ContactFooterComponent } from '../shared/contact-footer/contact-footer.component';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [ContactFooterComponent],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css',
})
export class DetailPageComponent {}
