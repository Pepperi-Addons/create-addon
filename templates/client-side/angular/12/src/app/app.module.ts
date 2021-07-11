import { PepMenuModule } from '@pepperi-addons/ngx-lib/menu';
import { PepTopBarModule } from '@pepperi-addons/ngx-lib/top-bar';
import { AddonModule } from './components/addon/addon.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { PepIconModule } from '@pepperi-addons/ngx-lib/icon';
import { PepSizeDetectorModule } from '@pepperi-addons/ngx-lib/size-detector';
import { createTranslateLoader } from './components/addon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { PepFileService, PepAddonService } from '@pepperi-addons/ngx-lib';
import { PepPageLayoutModule } from '@pepperi-addons/ngx-lib/page-layout';


@NgModule({
    declarations: [
        AppComponent

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AddonModule,
        AppRoutingModule,
        PepSizeDetectorModule,
        MatIconModule,
        PepIconModule,
        PepTopBarModule,
        PepMenuModule,
        PepPageLayoutModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient, PepFileService, PepAddonService]
            }
        })

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}




