import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthRepository } from '../core/domain/ports/auth.repository';
import { AuthRepositoryImpl } from '../core/infrastructure/services/auth-repository.impl';
import { ThreatRepository } from '../core/domain/ports/threat.repository';
import { ThreatRepositoryImpl } from '../core/infrastructure/services/threat-repository.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
    { provide: ThreatRepository, useClass: ThreatRepositoryImpl }
  ]
};
