import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-footer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './contact-footer.component.html',
  styleUrl: './contact-footer.component.css',
})
export class ContactFooterComponent {
  copyrightYear = new Date().getFullYear();
  accessTime = new Date();
}
