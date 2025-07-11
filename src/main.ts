import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { APP_INITIALIZER } from '@angular/core';
import { ConfigurationService } from './app/services/configuration-service';
import { appInitializerFn } from './app/core/app-initializer';

// bootstrapApplication(AppComponent, {
//   providers: [
//     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
//     provideIonicAngular(),
//     provideRouter(routes, withPreloading(PreloadAllModules)),
//     MatDatepickerModule,
//     provideNativeDateAdapter()
//   ],
// });


bootstrapApplication(AppComponent, {
  providers: [
    // Ionic & Routing
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // App-wide services
    ConfigurationService,

    // 👇 Your App Initializer here
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      deps: [ConfigurationService],
      multi: true,
    },

    // Material & animation
    MatDatepickerModule,
    provideNativeDateAdapter(),
  ],
});