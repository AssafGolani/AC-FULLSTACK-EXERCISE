import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Person } from '../models/person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css',
})
export class PersonListComponent {
  @Input() people: Person[] | null = [];
  @Input() sortBy: string | null = null;
  @Output() personSelected = new EventEmitter<Person>();

  sortedPeople: Person[] | null = [];

  selectPerson(person: Person) {
    this.personSelected.emit(person);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['people'] || changes['sortBy']) {
      this.sortPeople();
    }
  }

  sortPeople() {
    if (this.people) {
      this.sortedPeople = [...this.people];
      if (this.sortBy === 'lastName') {
        this.sortedPeople.sort((a, b) => a.LastName.localeCompare(b.LastName));
      } else if (this.sortBy === 'age') {
        this.sortedPeople.sort((a, b) => a.Age - b.Age);
      }
    }
  }
}
