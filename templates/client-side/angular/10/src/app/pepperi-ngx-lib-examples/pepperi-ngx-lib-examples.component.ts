import { Component, OnInit } from '@angular/core';
import { PepFieldClickedData, PepFieldValueChangedData } from '@pepperi-addons/ngx-lib';
import { PepGroupButtonsViewType, PepGroupButton } from '@pepperi-addons/ngx-lib/group-buttons';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'addon-ngx-lib-examples',
    templateUrl: './pepperi-ngx-lib-examples.component.html',
    styleUrls: ['./pepperi-ngx-lib-examples.component.scss']
})
export class PepperiNgxLibExamplesComponent implements OnInit {

    title = 'client-side';
    minDateValue: number;
    maxDateValue: number;
    groupButtons: Array<PepGroupButton>;
    richHtml;
    
    constructor() { 
        this.minDateValue = new Date(1-1-2019).getTime();
        this.maxDateValue = new Date(1-1-2021).getTime();
        
        this.groupButtons = [
            { key: '', value: 'test', class: '', callback: (event) => this.onGroupButtonClicked(event, 'test'), icon: null },
            { key: '', value: '', class: 'caution', callback: (event) => this.onGroupButtonClicked(event, 'del'), icon: 'system_bin' },
        ];
        
        this.richHtml = "<h1><u>Rich Text Value Example</u></h1><h2><em style=' color: rgb(147, 200, 14);'>Pepperi Rich Text Value </em><u style='color: rgb(0, 102, 204);'>Example</u></h2><ol><li><strong><u>Pepperi Rich Text Value Example</u></strong></li><li>Pepperi Rich text [value] example</li></ol>";
    }

    ngOnInit(): void {

    }
    
    onValueChanged(event: PepFieldValueChangedData) {
        alert(`${event.key}: value was changed to ${event.value}`);
    }

    elementClicked(event: PepFieldClickedData) {
        alert(`${event.key}: was clicked`);
    }
    
    onMenuItemClicked(event) {
        alert(`${event.key}: was clicked`);
    }

    onGroupButtonClicked(event: PepGroupButton, title): void {
        alert(title);
    }
}
