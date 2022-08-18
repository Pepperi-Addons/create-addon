import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { PepLayoutService, PepScreenSizeType } from '@pepperi-addons/ngx-lib';
import { TranslateService } from '@ngx-translate/core';

import { AddonService } from "../services/addon.service";
import { IPepGenericListDataSource, IPepGenericListActions } from "@pepperi-addons/ngx-composite-lib/generic-list";
import { PepSelectionData } from '@pepperi-addons/ngx-lib/list';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'addon-block',
    templateUrl: './addon.component.html',
    styleUrls: ['./addon.component.scss']
})
export class BlockComponent implements OnInit {
    @Input() hostObject: any;
    
    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();
    
    screenSize: PepScreenSizeType;

    constructor(
        public addonService: AddonService,
        public router: Router,
        public route: ActivatedRoute,
        public layoutService: PepLayoutService,
        public translate: TranslateService
    ) {
        this.layoutService.onResize$.subscribe(size => {
            this.screenSize = size;
        });
    }

    ngOnInit() {
    }

    openDialog() {
        
    }
    
    listDataSource: IPepGenericListDataSource = {
        init: async (state) => {
            return {
                dataView: {
                    Context: {
                        Name: '',
                        Profile: { InternalID: 0 },
                        ScreenSize: 'Landscape'
                      },
                      Type: 'Grid',
                      Title: '',
                      Fields: [
                        {
                            FieldID: 'Field1',
                            Type: 'TextBox',
                            Title: 'Field1',
                            Mandatory: false,
                            ReadOnly: true
                        },
                        {
                            FieldID: 'Field2',
                            Type: 'Boolean',
                            Title: 'Field2',
                            Mandatory: false,
                            ReadOnly: true
                        }
                      ],
                      Columns: [
                        {
                          Width: 25
                        },
                        {
                          Width: 25
                        }
                      ],
                      FrozenColumnsCount: 0,
                      MinimumColumnWidth: 0
                    }, items: [{
                        Key: 'key1',
                        Field1: 'Hello',
                        Field2: true
                    },
                    {
                        Key: 'key1',
                        Field1: 'World',
                        Field2: false
                    }], totalCount: 2
                
            }
        }
        
    }

    actions: IPepGenericListActions = {
        get: async (data: PepSelectionData) => {
            if (data.rows.length) {
                return [{
                    title: this.translate.instant("Edit"),
                    handler: async (objs) => {
                        this.router.navigate([objs[0].Key], {
                            relativeTo: this.route,
                            queryParamsHandling: 'merge'
                        });
                    }
                }]
            } else return []
        }
    }
}
