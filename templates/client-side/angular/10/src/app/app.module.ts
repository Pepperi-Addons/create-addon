import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PepperiNgxLibExamplesComponent } from './pepperi-ngx-lib-examples/pepperi-ngx-lib-examples.component';
import { PepperiListExampleComponent } from './pepperi-list-example/pepperi-list-example.component';
import { PepUIModule } from './modules/pepperi.module';
import { MaterialModule } from './modules/material.module';

@NgModule({
    declarations: [
        AppComponent,
        PepperiNgxLibExamplesComponent,
        PepperiListExampleComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        PepUIModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}




