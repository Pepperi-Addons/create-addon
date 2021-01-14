
import { enableProdMode, NgZone } from 'src/app/components/empty-route/node_modules/@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { ɵAnimationEngine as AnimationEngine } from '@angular/animations/browser';

import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

declare var CLIENT_MODE: any;

if (environment.production) {
    enableProdMode();
}

let lifecycles = null;

if (CLIENT_MODE === 'Standalone') {
    platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

else {
    lifecycles = singleSpaAngular({
        bootstrapFunction: singleSpaProps => {
            singleSpaPropsSubject.next(singleSpaProps);
            return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
        },
        template: '<addon-root />',
        Router,
        NgZone,
        AnimationEngine,
    });


}

export const bootstrap = CLIENT_MODE === 'Standalone' ? '' : lifecycles.bootstrap;
export const mount = CLIENT_MODE === 'Standalone' ? '' : lifecycles.mount;
export const unmount = CLIENT_MODE === 'Standalone' ? '' : lifecycles.unmount;


