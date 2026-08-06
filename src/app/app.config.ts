import { ApplicationConfig, importProvidersFrom, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const API_BASE_URL = new InjectionToken<string>('URL base da API');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: API_BASE_URL,
      useValue: 'http://localhost:3333/api',
    },
    importProvidersFrom(HttpClientModule),
  ],
};
