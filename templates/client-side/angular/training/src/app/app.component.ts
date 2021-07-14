import { AddonService } from './services/addon.service';
import { Component, OnInit } from '@angular/core';
import { PepCustomizationService, PepLoaderService, PepStyleType } from '@pepperi-addons/ngx-lib';

declare var CLIENT_MODE: any;

@Component({
    selector: 'addon-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    footerHeight: number;
    showLoading = false;
    clientMode: string;


    constructor(
        public customizationService: PepCustomizationService,
        public loaderService: PepLoaderService,
        public addonService: AddonService
    ) {
        this.loaderService.onChanged$
            .subscribe((show) => {
                this.showLoading = show;
            });
            this.clientMode = CLIENT_MODE;
    }

    ngOnInit() {
        this.customizationService.setThemeVariables();
        this.customizationService.footerHeight.subscribe(footerHeight => this.footerHeight = footerHeight);
    }

    getTopBarStyle() {
        return document.documentElement.style.getPropertyValue(PepCustomizationService.STYLE_TOP_HEADER_KEY) as PepStyleType;
    }

    getButtonClassName() {
        return this.getTopBarStyle() === 'strong' ? 'keep-background-on-focus' : 'invert';
    }
}
