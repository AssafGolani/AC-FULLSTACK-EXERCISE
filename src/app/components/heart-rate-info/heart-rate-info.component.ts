import { Component, Input } from '@angular/core';
import { HeartRateData } from '../../models/person.model';
import { CommonModule } from '@angular/common';
import { HeartRateDetailsComponent } from '../heart-rate-details/heart-rate-details.component';

@Component({
  selector: 'app-heart-rate-info',
  standalone: true,
  imports: [CommonModule, HeartRateDetailsComponent],
  templateUrl: './heart-rate-info.component.html',
  styleUrl: './heart-rate-info.component.css',
})
export class HeartRateInfoComponent {
  @Input() heartRateData: HeartRateData | null = null;
}
