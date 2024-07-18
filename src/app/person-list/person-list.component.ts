import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() personSelected = new EventEmitter<Person>();

  selectPerson(person: Person) {
    this.personSelected.emit(person);
  }
}
