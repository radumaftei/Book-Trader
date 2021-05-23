import { animate, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('*<=>*', [
    // css styles at start of transition
    style({ opacity: 0 }),

    // animation and styles at end of transition
    animate('1s', style({ opacity: 1 })),
  ]),
]);
