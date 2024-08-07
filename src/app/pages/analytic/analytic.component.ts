import { Component } from '@angular/core';
import { BadgeComponent } from '../../components/badge/badge.component';
import { ServerService } from '../../services/server.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { CandidateStatusList } from '../../services/interfaces/candidate-status.interface';

@Component({
  selector: 'app-analytic',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './analytic.component.html',
})
export class AnalyticComponent {
  firstStep: string = '1* Selecionar curriculo';
  secondStep: string = '2* Selecionar palavras';
  observation: string =
    'Observação: As palavras devem ser separadas por vírgula';

  attachment: string = 'select pdf or image';
  wordsToSelectText: string = 'Select the words to analise';

  nothingSelected: string = 'Nothing selected';
  _userInputWords: string = '';

  filesQuantity: number = 0;
  filesSelected: File[] = [];
  wordsSelected: string[] = [];

  ocrResponse!: CandidateStatusList;

  getSelectedText() {
    if (this.filesQuantity > 0) {
      return `Selected ${this.filesQuantity} files`;
    }

    return this.nothingSelected;
  }

  constructor(
    private readonly serverService: ServerService,
    private readonly sharedService: SharedService,
    private readonly router: Router
  ) {}

  clearFilesSelected() {
    this.filesSelected = [];
    this.filesQuantity = 0;
  }

  onFileSelected(event: any) {
    if (this.filesSelected.length || this.filesQuantity > 0) {
      this.clearFilesSelected();
    }

    const file: File[] = event.files;

    if (!event || !file.length) {
      return;
    }

    this.filesQuantity = file.length;
    for (let i = 0; i < file.length; i++) {
      this.filesSelected.push(file[i]);
    }
  }

  get userInputWords() {
    return this._userInputWords;
  }

  onWordsTyping(event: KeyboardEvent) {
    const word: any[] = [];
    word.push(event.key);
  }

  validateWords(event: string) {
    const words = event.split(',').filter((word) => {
      if (word) {
        return word.trim();
      }
      return false;
    });

    this.wordsSelected = words;
  }

  sendToAnalytics() {
    this.systemUnderMaintenance(true);
    this.ocr(this.filesSelected, this.wordsSelected);
  }

  textSelected(word: string, index: number): string {
    return `${index + 1} : ${word}`;
  }

  serverStatus() {
    this.serverService.health().subscribe(
      (response: any) => {
        console.log('response', response);
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  ocr(files: File[], words: string[]): void {
    this.serverService.ocr(files, words).subscribe(
      (response: CandidateStatusList) => {
        this.ocrResponse = response;

        console.log('response', response);
        this.setSharedValue();
        this.goToResponsePage();
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  setSharedValue() {
    this.sharedService.setSharedValue(this.ocrResponse);
  }

  goToResponsePage() {
    this.router.navigate(['/response']);
  }

  systemUnderMaintenance(underMaintenance: boolean): void {
    if (underMaintenance) {
      return window.alert(
        'Servico em manutenção temporária, tentar novamente mais tarde'
      );
    }
  }
}
