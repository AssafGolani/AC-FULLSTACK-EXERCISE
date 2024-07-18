import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css',
})
export class PersonListComponent implements OnChanges {
  @Input() people: Person[] | null = [];
  @Input() sortBy: string | null = null;
  @Input() searchQuery: string | null = null;
  @Output() personSelected = new EventEmitter<Person>();

  filteredPeople: Person[] | null = [];

  selectPerson(person: Person) {
    this.personSelected.emit(person);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['people'] || changes['sortBy'] || changes['searchQuery']) {
      this.filterAndSortPeople();
    }
  }

  filterAndSortPeople() {
    if (this.people) {
      let filtered = [...this.people];
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (person) =>
            person.FirstName.toLowerCase().includes(query) ||
            person.LastName.toLowerCase().includes(query)
        );
      }
      if (this.sortBy === 'lastName') {
        filtered.sort((a, b) => a.LastName.localeCompare(b.LastName));
      } else if (this.sortBy === 'age') {
        filtered.sort((a, b) => a.Age - b.Age);
      }
      this.filteredPeople = filtered;
    }
  }
}
