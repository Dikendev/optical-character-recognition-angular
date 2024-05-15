import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { GreetingsComponent } from './greetings/greetings.component';
import { AnalyticComponent } from '../analytic/analytic.component';
import { FeatureComponent } from './feature/feature.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonComponent,
    GreetingsComponent,
    AnalyticComponent,
    ButtonComponent,
    FeatureComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'Home Page';

  explanationTitle = 'Mas como é feita essa análise?';

  explanationText =
    'Para cada vaga é pre definida palavras chaves para  buscar se as mesmas existem nos curriculos assim os selecionando nessa primeira etapa.?';

  textTitle =
    'Todos nós sabemos que as empresas estão cada dia optando por utilizar IA para agilizar processos e automatizar, e com isso existe uma pre-seleção de curriculos feita por ia.';

  text =
    'Este sistema utiliza Optical Character Recognition (OCR), uma tecnologia que possibilita o reconhecimento de caracteres a partir de arquivos de imagem.';

  howItWorksText =
    'Aqui você pode simular e testar se o seu curriculo passaria por essa etapa.';
}
