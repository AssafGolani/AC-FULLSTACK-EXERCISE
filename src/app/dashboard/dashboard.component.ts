import { Component, inject, OnInit } from '@angular/core';
import { HeartRateData, Person } from '../models/person.model';
import { AccessDbService } from '../services/access-db.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Status } from '../enums/status.enum';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { PersonListComponent } from '../person-list/person-list.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PersonListComponent,
    PersonDetailsComponent,
    ToolbarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private accessDbService: AccessDbService = inject(AccessDbService);
  private authService: AuthService = inject(AuthService);
  people: Person[] = [];
  selectedPerson: Person | null = null;
  heartRateData: HeartRateData | null = null;
  bmi: number | null = null;

  constructor() {}

  ngOnInit(): void {
    this.accessDbService.getPersonData().subscribe((people) => {
      this.people = people;
    });
  }

  togglePerson(person: Person) {
    if (this.selectedPerson === person) {
      this.selectedPerson = null;
      this.heartRateData = null;
      this.bmi = null;
    } else {
      this.selectedPerson = person;
      this.heartRateData = this.calculateHeartRateData(person.HeartRate);
      this.bmi = this.calculateBMI(person.Weight, person.Height);
    }
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
      averageHeartRate: +(totalHeartRate / heartRates.length).toFixed(2),
    };
  }

  calculateBMI(weight: number, height: number): number {
    return weight / (height / 100) ** 2;
  }

  selectPerson(person: Person): void {
    this.selectedPerson = person;
    this.heartRateData = this.calculateHeartRateData(person.HeartRate);
    this.bmi = this.calculateBMI(person.Weight, person.Height);
  }
}
