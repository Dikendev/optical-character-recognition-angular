import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateStatusList } from './interfaces/candidate-status.interface';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public sharedValue$: Observable<CandidateStatusList> =
    new Observable<CandidateStatusList>();

  constructor() {}

  public setSharedValue(candidateStatusList: CandidateStatusList): void {
    this.sharedValue$ = new Observable<CandidateStatusList>((observer) => {
      observer.next(candidateStatusList);
    });
  }
}
