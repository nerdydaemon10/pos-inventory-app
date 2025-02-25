import { MessageService } from 'primeng/api'
import { provideRouter } from '@angular/router'
import { providePrimeNG } from "primeng/config"
import { provideZoneChangeDetection, ApplicationConfig } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'

import { routes } from './app.routes'
import { theme } from './app.theme'
import { normalizerInterceptor } from './core/interceptors/normalizer.interceptor'
import { networkInterceptor } from './core/interceptors/network.interceptor'
import { provideConstsProvider } from './core/constants.provider'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(), // required for primeng components
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withFetch(),
      withInterceptors([networkInterceptor, normalizerInterceptor])
    ),
    provideRouter(routes),
    providePrimeNG(theme), // set theme
    provideConstsProvider(),
    MessageService
  ],
};