import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heart-rate-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heart-rate-details.component.html',
  styleUrl: './heart-rate-details.component.css',
})
export class HeartRateDetailsComponent {
  @Input() label: string = '';
  @Input() value: number | null = null;
  @Input() noDataMessage: string = 'No data detected';
}
