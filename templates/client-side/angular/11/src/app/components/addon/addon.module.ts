import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddonComponent } from './index';
import { PepUIModule } from '../../modules/pepperi.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AddonComponent

    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        PepUIModule

    ],
    exports: [AddonComponent]
})
export class AddonModule {
}




