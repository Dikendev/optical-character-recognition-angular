import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  developer: string = 'Diego Kennedy Guimarães Barros';
  linkedlnLink: string =
    'https://www.linkedin.com/in/diego-kennedy-guimar%C3%A3es-barros-7b1b3b1b3/';
  gitHubLink: string = '';

  constructor() {}
}
