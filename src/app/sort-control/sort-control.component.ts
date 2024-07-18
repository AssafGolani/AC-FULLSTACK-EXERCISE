import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-sort-control',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './sort-control.component.html',
  styleUrl: './sort-control.component.css',
})
export class SortControlComponent {
  @Output() sortChanged = new EventEmitter<string>();

  onSortChange(sortOption: string) {
    this.sortChanged.emit(sortOption);
  }
}
