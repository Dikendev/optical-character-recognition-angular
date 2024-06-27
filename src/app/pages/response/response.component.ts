import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { CandidateStatusList } from '../../services/interfaces/candidate-status.interface';
import { BadgeComponent } from '../../components/badge/badge.component';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './response.component.html',
})
export class ResponseComponent implements OnInit {
  foundWordsMessage = 'Palavras encontradas no documento';

  gitHubText = 'Que tal deixar uma estrela no repositório do Github?';

  candidateStatusList!: CandidateStatusList;

  constructor(private readonly sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.sharedValue$.subscribe((value) => {
      this.candidateStatusList = value;
    });
  }
}
