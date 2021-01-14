import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PepUIModule } from '../../modules/pepperi.module';
import { MaterialModule } from '../../modules/material.module';
import { AddonComponent } from './addon.component';

@NgModule({
    declarations: [
        AddonComponent

    ],
    imports: [
        CommonModule,
        PepUIModule,
        MaterialModule,

    ],
    providers: []
})
export class AddonModule {
}




