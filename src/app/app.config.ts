import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { providePrimeNG} from "primeng/config"

import { routes } from './app.routes';
import { theme } from './app.theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(), // required for primeng components
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG(theme), // set theme
  ]
};