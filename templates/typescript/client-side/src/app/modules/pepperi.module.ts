import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PepperiIconModule, PepperiIconRegistry,
  pepperiIconSystemBolt,  pepperiIconNoImage
} from '@pepperi/lib/icon';
import { PepperiModule, AddonService, CustomizationService} from '@pepperi/lib';
import { PepperiAttachmentModule } from '@pepperi/lib/attachment';
import { PepperiCheckboxModule } from '@pepperi/lib/checkbox';
import { PepperiColorModule } from '@pepperi/lib/color';
import { PepperiDateModule } from '@pepperi/lib/date';
import { PepperiGroupButtonsModule } from '@pepperi/lib/group-buttons';
import { PepperiImageModule } from '@pepperi/lib/image';
import { PepperiImagesFilmstripModule } from '@pepperi/lib/images-filmstrip';
import { PepperiInternalButtonModule } from '@pepperi/lib/internal-button';
import { PepperiMenuModule } from '@pepperi/lib/menu';
import { PepperiQuantitySelectorModule } from '@pepperi/lib/quantity-selector';
import { PepperiRichHtmlTextareaModule } from '@pepperi/lib/rich-html-textarea';
import { PepperiSelectModule } from '@pepperi/lib/select';
import { PepperiSeparatorModule } from '@pepperi/lib/separator';
import { PepperiSignatureModule } from '@pepperi/lib/signature';
import { PepperiSizeDetectorModule } from '@pepperi/lib/size-detector';
import { PepperiTextareaModule } from '@pepperi/lib/textarea';
import { PepperiTextboxModule } from '@pepperi/lib/textbox';
import { PepperiListModule } from '@pepperi/lib/list';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

const pepperiComponentsModules = [
  PepperiAttachmentModule,
  PepperiCheckboxModule,
  PepperiColorModule,
  PepperiDateModule,
  PepperiGroupButtonsModule,
  PepperiImageModule,
  PepperiImagesFilmstripModule,
  PepperiListModule,
  PepperiCheckboxModule,
  PepperiInternalButtonModule,
  PepperiMenuModule,
  PepperiQuantitySelectorModule,
  PepperiRichHtmlTextareaModule,
  PepperiSelectModule,
  PepperiSeparatorModule,
  PepperiSignatureModule,
  PepperiSizeDetectorModule,
  PepperiTextareaModule,
  PepperiTextboxModule,
  PepperiIconModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PepperiModule,
    pepperiComponentsModules,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
    })
  ],
  exports: [
    PepperiModule,
    pepperiComponentsModules
  ]
})
export class PepperiUIModule {

  constructor(
        translate: TranslateService,
        private pepperiIconRegistry: PepperiIconRegistry
    ) {
      this.pepperiIconRegistry.registerIcons([
        pepperiIconSystemBolt,
        pepperiIconNoImage
    ]);

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
