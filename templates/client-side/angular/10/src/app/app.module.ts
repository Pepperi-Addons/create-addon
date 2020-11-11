import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PepperiNgxLibExamplesComponent } from './pepperi-ngx-lib-examples/pepperi-ngx-lib-examples.component';
import { PepperiListExampleComponent } from './pepperi-list-example/pepperi-list-example.component';
import { PepUIModule } from './modules/pepperi.module';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
  MissingTranslationHandler,
  MissingTranslationHandlerParams
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { HttpClient } from '@angular/common/http';
import { FileService } from '@pepperi-addons/ngx-lib';

export function createTranslateLoader(http: HttpClient, fileService: FileService) {
  const translationsPath: string = fileService.getAssetsTranslationsPath();

  return new MultiTranslateHttpLoader(http, [
      {prefix: translationsPath, suffix: '.json'},
      {prefix: '/assets/i18n/', suffix: '.json'},
  ]);
}
@NgModule({
  declarations: [
    AppComponent,
    PepperiNgxLibExamplesComponent,
    PepperiListExampleComponent
  ],
  imports: [
      PepUIModule,
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    translate: TranslateService){

      let userLang = 'en';
      translate.setDefaultLang(userLang);
      userLang = translate.getBrowserLang().split('-')[0]; // use navigator lang if available

      if (location.href.indexOf('userLang=en') > -1) {
            userLang = 'en';
        }

        // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use(userLang).subscribe((res: any) => {
            // In here you can put the code you want. At this point the lang will be loaded
        });
      }

    }




