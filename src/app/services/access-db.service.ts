import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class AccessDbService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = '/api/rest/mypeople';
  constructor() {}

  getPersonData(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl, {
      headers: {
        'cache-control': 'no-cache',
        'x-apikey': 'f534b6365ca29a799b267c496ba312d4247d9',
      },
    });
  }
}
