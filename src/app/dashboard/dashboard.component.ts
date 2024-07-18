import { Component, inject, OnInit } from '@angular/core';
import { HeartRateData, Person } from '../models/person.model';
import { PeopleService } from '../services/people.service';
import { CommonModule } from '@angular/common';
import { Status } from '../enums/status.enum';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { PersonListComponent } from '../person-list/person-list.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';

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
  private peopleService: PeopleService = inject(PeopleService);
  private subscription: Subscription = new Subscription();
  people$: Observable<Person[]> | undefined;
  selectedPerson$: Observable<Person | null> | undefined;
  heartRateData$: Observable<HeartRateData | null> | undefined;
  bmi$: Observable<number | null> | undefined;

  private selectedPersonSubject = new BehaviorSubject<Person | null>(null);

  constructor() {}

  ngOnInit(): void {
    this.people$ = this.peopleService.getPersonData();
    this.selectedPerson$ = this.selectedPersonSubject.asObservable();
    this.heartRateData$ = this.selectedPerson$.pipe(
      map((person) =>
        person
          ? this.peopleService.calculateHeartRateData(person.HeartRate)
          : null
      )
    );
    this.bmi$ = this.selectedPerson$.pipe(
      map((person) =>
        person
          ? this.peopleService.calculateBMI(person.Weight, person.Height)
          : null
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  togglePerson(person: Person) {
    this.selectedPersonSubject.next(
      this.selectedPersonSubject.value === person ? null : person
    );
  }
}
