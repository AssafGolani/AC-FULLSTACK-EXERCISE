import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const slideInOutAnimation = trigger('slideInOut', [
  state('in', style({ transform: 'translateY(0)', opacity: 1 })),
  transition(':enter', [
    style({ transform: 'translateY(-20%)', opacity: 0 }),
    animate('300ms ease-in'),
  ]),
  transition(':leave', [
    animate(
      '300ms ease-out',
      style({ transform: 'translateY(-20%)', opacity: 0 })
    ),
  ]),
]);
