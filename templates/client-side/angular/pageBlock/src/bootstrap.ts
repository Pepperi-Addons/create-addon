// import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { enableProdMode } from '@angular/core';

// if (environment.production) {
//     enableProdMode();
// }

// platformBrowserDynamic().bootstrapModule(AppModule)
//     .catch(err => console.error(err));
    
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { bootstrap } from '@angular-architects/module-federation-tools';

bootstrap(AppModule, {
    production: environment.production,
    appType: 'microfrontend' // Only if we have routes use this!!!
});