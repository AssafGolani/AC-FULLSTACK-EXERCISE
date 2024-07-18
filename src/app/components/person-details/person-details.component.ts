import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HeartRateData, Person } from '../../models/person.model';

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css',
})
export class PersonDetailsComponent {
  @Input() person: Person | null = null;
  @Input() heartRateData: HeartRateData | null = null;
  @Input() bmi: number | null = null;
}
