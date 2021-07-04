import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepDataConvertorService, FIELD_TYPE, PepFieldData, PepRowData } from '@pepperi-addons/ngx-lib';
import { PepListComponent } from '@pepperi-addons/ngx-lib/list';

@Component({
  selector: 'pep-table',
  template: `<div class="list-container" #listContainer>
  <pep-list

      [firstFieldAsLink]="false"
      [isReport]="true"
      [supportSorting]="false"
      [supportResizing]="false"
      [selectionTypeForActions]="'single'"
      [noDataFoundMsg]="'No data'"
      (listChange)="listChanged.emit($event)"
      (sortingChange)="sortingChanged.emit($event)"
      (fieldClick)="fieldClicked.emit($event)"
      (selectedItemsChange)="selectedItemsChanged.emit($event)">
  </pep-list>
</div>`
})
export class PepperiTableComponent implements OnInit, OnChanges {


    @Input() dataSource = null;
    @Input() displayedColumns = null;
    @Input() customizeTable = null;

    @ViewChild(PepListComponent) customList: PepListComponent;

    @Output() listChanged: EventEmitter<any> = new EventEmitter();
    @Output() sortingChanged: EventEmitter<any> = new EventEmitter();
    @Output() fieldClicked: EventEmitter<any> = new EventEmitter();
    @Output() selectedItemsChanged: EventEmitter<any> = new EventEmitter();

    constructor(
        private translate: TranslateService,
        private dataConvertorService: PepDataConvertorService
    ) {

    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes?.dataSource?.currentValue){
            this.initPepList(this.dataSource, this.displayedColumns, this.customizeTable);
        }

    }

    initPepList(dataSource, displayedColumns = null, customizeFn = null) {
        if (this.customList && dataSource) {
            const tableData = new Array<PepRowData>();
            dataSource.forEach((row: any) => tableData.push(this.convertObjectToPepRowData(row, displayedColumns, customizeFn)));
            const uiControl = this.dataConvertorService.getUiControl(tableData[0]);
            const rows = this.dataConvertorService.convertListData(tableData);
            this.customList.initListData(uiControl, rows.length, rows, 'table', '', true);
        }
    }

    convertObjectToPepRowData(object: any, displayedColumns = null, customizeFn = null) {
        const row = new PepRowData();
        row.Fields = [];
        const keys = displayedColumns ? displayedColumns : Object.keys(object);
        keys.forEach(key => row.Fields.push(this.initDataRowField(object, key, customizeFn)));
        return row;
    }

    initDataRowField(object: any, key: any, customizeFn = null): PepFieldData {

        const dataRowField: PepFieldData = {
            ApiName: key,
            Title: this.translate.instant(key),
            XAlignment: 1,
            FormattedValue: object[key] ? object[key].toString() : '',
            Value:  object[key] ? object[key].toString() : '',
            ColumnWidth: 10,
            AdditionalValue: '',
            OptionalValues: [],
            FieldType: FIELD_TYPE.TextBox
        };
        if (customizeFn){
            return customizeFn(object, key, dataRowField);
        }
        else {
            return dataRowField;
        }

    }

    getSelectedItemsData(){
        return this.customList.getSelectedItemsData();
    }

    getItemDataByID(id: string){
        return this.customList.getItemDataByID(id);
    }


}
