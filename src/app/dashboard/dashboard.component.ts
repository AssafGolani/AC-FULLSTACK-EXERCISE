import { Component, inject } from '@angular/core';
import { HeartRateData, Person } from '../models/person.model';
import { AccessDbService } from '../services/access-db.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private accessDbService: AccessDbService = inject(AccessDbService);
  private authService: AuthService = inject(AuthService);
  people: Person[] = [];
  selectedPerson: Person | null = null;
  heartRateData: HeartRateData | null = null;

  constructor() {}

  ngOnInit(): void {
    this.accessDbService.getPersonData().subscribe((people) => {
      this.people = people;
    });
  }

  selectPerson(person: Person): void {
    this.selectedPerson = person;
    this.heartRateData = null;
  }

  logout(): void {
    this.authService.logout();
  }
}
