import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CandidateStatusList } from './interfaces/candidate-status.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private readonly http: HttpClient) {}

  health() {
    const url = `${environment.apiUrl}/ocr/health`;
    return this.http.get(url);
  }

  ocr(files: File[], words: string[]): Observable<CandidateStatusList> {
    const url = `${environment.apiUrl}/api/ocr/recognize-words`;

    const formData = new FormData();
    files.forEach((file, _) => {
      formData.append('files', file, file.name);
    });

    formData.append('wordsToFind', JSON.stringify(words));

    return this.http.post<CandidateStatusList>(url, formData);
  }
}
