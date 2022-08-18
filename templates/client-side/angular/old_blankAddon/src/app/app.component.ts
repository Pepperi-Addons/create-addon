import { Component, OnInit } from '@angular/core';
import {  TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'addon-block-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        public translate: TranslateService
    ) {
    }

    ngOnInit() {
    }
}
