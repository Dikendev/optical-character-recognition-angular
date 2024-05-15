import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
})
export class BadgeComponent {
  @Input() wordSelected!: string;
}
