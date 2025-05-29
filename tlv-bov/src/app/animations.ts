import { animate, style, transition, trigger } from '@angular/animations';

export const routeAnimations = [
  trigger('routeFade', [
    transition('* <=> *', [
      style({ opacity: 0 }), 
      animate('300ms ease-out', style({ opacity: 1 }))
    ])
  ]),
  trigger('slideInOut', [
    transition(':enter', [
      style({ transform: 'translateX(100%)' }),
      animate('300ms ease-out', style({ transform: 'translateX(0)' }))
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
    ])
  ])
];