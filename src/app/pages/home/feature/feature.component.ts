import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css',
})
export class FeatureComponent {
  @Input() text!: string;
  @Input() title!: string;
  @Input() customCss!: string;

  get customCssClass() {
    return this.customCss;
  }

  get textTitle() {
    return this.text;
  }
}
