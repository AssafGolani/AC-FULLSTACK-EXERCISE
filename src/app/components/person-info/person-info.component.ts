import { Component, Input } from '@angular/core';
import { Person } from '../../models/person.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-info.component.html',
  styleUrl: './person-info.component.css',
})
export class PersonInfoComponent {
  @Input() person: Person | null = null;
  @Input() bmi: number | null = null;
}
