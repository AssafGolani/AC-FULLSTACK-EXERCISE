import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeartRateData, Person } from '../models/person.model';
import { Status } from '../enums/status.enum';

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

  calculateHeartRateData(heartRateString: string): HeartRateData {
    const heartRates = heartRateString
      .split(';')
      .map((rate) => parseInt(rate, 10));
    let status: Status = Status.Sleeping;
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
