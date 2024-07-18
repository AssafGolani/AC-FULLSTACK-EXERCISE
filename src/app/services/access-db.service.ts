import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class AccessDbService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = 'https://healthrate-6cb6.restdb.io/rest/test-db';
  constructor() {}

  getPersonData(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }
}
