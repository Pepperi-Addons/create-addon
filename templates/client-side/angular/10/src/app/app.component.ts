import { Component, OnInit } from '@angular/core';
import { CustomizationService, PepStyleType } from '@pepperi-addons/ngx-lib';

@Component({
    selector: 'addon-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    
    footerHeight: number;

    showLoading = false;

    constructor(public customizationService: CustomizationService) {
    } 

    ngOnInit() {
        this.customizationService.setThemeVariables();

        this.customizationService.footerHeight.subscribe(footerHeight => {
            this.footerHeight = footerHeight;
        });
    }

    getTopBarStyle() {
        return document.documentElement.style.getPropertyValue(CustomizationService.STYLE_TOP_HEADER_KEY) as PepStyleType;
    }

    navigateHome() {
        alert('Home');
    }

    getButtonClassName() {
        return this.getTopBarStyle() === 'strong' ? 'keep-background-on-focus' : 'invert';
    }

}
