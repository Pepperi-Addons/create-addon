import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { PepUIModule } from './modules/pepperi.module';
import { MaterialModule } from './modules/material.module';
import { AddonModule } from './components/addon/addon.module';

@NgModule({
    declarations: [
        AppComponent

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        PepUIModule,
        MaterialModule,
        AddonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}




