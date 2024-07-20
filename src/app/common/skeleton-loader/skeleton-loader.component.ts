import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.css',
})
export class SkeletonLoaderComponent {
  @Input() items = new Array(10);
}
