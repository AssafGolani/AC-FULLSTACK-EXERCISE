import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { HeartRateData, Person } from '../models/person.model';
import { Status } from '../enums/status.enum';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/rest/mypeople';

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor() {}

  getPersonData(): Observable<Person[]> {
    const headers = new HttpHeaders({
      'cache-control': 'no-cache',
      'x-apikey': environment.apiKey,
    });
    return this.http.get<Person[]>(this.apiUrl, { headers }).pipe(
      tap(() => this.loadingSubject.next(true)),
      catchError((error) => {
        this.loadingSubject.next(false);
        return throwError(error);
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  calculateHeartRateData(heartRateString: string): HeartRateData {
    const heartRates = heartRateString
      .split(';')
      .map((rate) => parseInt(rate, 10));
    let status: Status | null = null;
    let firstMinuteSleeping: number | null = null;
    let firstMinuteAwake: number | null = null;
    let firstMinuteWorkout: number | null = null;
    let totalHeartRate = 0;

    heartRates.forEach((rate, index) => {
      totalHeartRate += rate;
      if (rate < 70 && status !== Status.Sleeping) {
        status = Status.Sleeping;
        firstMinuteSleeping = firstMinuteSleeping || index + 1;
      } else if (rate >= 70 && rate < 90 && status !== Status.Awake) {
        status = Status.Awake;
        firstMinuteAwake = firstMinuteAwake || index + 1;
      } else if (rate >= 90 && status !== Status.Workout) {
        status = Status.Workout;
        firstMinuteWorkout = firstMinuteWorkout || index + 1;
      }
    });

    return {
      firstMinuteSleeping,
      firstMinuteAwake,
      firstMinuteWorkout,
      averageHeartRate: totalHeartRate / heartRates.length,
    };
  }

  calculateBMI(weight: number, height: number): number {
    return weight / (height / 100) ** 2;
  }
}
