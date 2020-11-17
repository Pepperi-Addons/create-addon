import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpService, ObjectSingleData, DataConvertorService,
    PepRowData, PepFieldData, FIELD_TYPE } from '@pepperi-addons/ngx-lib';
import { PepListComponent } from '@pepperi-addons/ngx-lib/list';
import { FakeData } from './fake-data';

@Component({
    selector: 'addon-pepperi-list-exmaple',
    templateUrl: './pepperi-list-example.component.html',
    styleUrls: ['./pepperi-list-example.component.scss']
})
export class PepperiListExampleComponent implements OnInit {
     
    // Just For example replace with service
     dataSource = FakeData.Addons;

    @ViewChild(PepListComponent) customList: PepListComponent;
 

    constructor(
        private translate: TranslateService,
        private dataConvertorService: DataConvertorService,
        private httpService: HttpService
    ) {

        const browserCultureLang = translate.getBrowserCultureLang();
    }

    ngOnInit() {
        
        // this.httpService.getPapiHttpCall('http://get_data')
        //     .subscribe(
        //         (res) => {
        //             debugger;
        //             console.log('')
        //         },
        //         (error) => {
        //             debugger;
        //             console.log(error);
        //         },
        //         () => {
        //             debugger;
        //         }
        // );

    }

    onMenuItemClicked(event) {
        alert(`${event.key}: was clicked`);
    }

    ngAfterViewInit() {
    }


    initPepList(dataSource) {
        if (this.customList && dataSource) {
            const tableData = new Array<PepRowData>();
            dataSource.forEach((rowData: any) => {
                const displayedColumns = ['Name', 'Description', 'Version', 'Type', 'AutomaticUpgrade'];
                tableData.push(this.convertToPepRowData(rowData, displayedColumns));
            });
            const pepperiListObj = this.dataConvertorService.convertListData(tableData);
            const buffer = [];
            if (pepperiListObj.Rows) {
                pepperiListObj.Rows.forEach( row => {
                    const osd = new ObjectSingleData(pepperiListObj.UIControl, row);
                    osd.IsEditable = true;
                    buffer.push(osd);
                });
            }

            this.customList.initListData(pepperiListObj.UIControl, buffer.length, buffer, 'table', '', true);
        }
    }

    convertToPepRowData(object: any, displayedColumns = null) {
        const row = new PepRowData();
        row.Fields = [];
        const keys = displayedColumns ? displayedColumns : Object.keys(object);
        keys.forEach(key => row.Fields.push(this.initDataRowField(object, key)));
        return row;
    }

    initDataRowField(object: any, key: any): PepFieldData {

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

        switch (key) {
            case 'Description':
                dataRowField.ColumnWidth = 25;
                break;
            case 'Name':
                dataRowField.ColumnWidth = 15;
                break;
            default:
                dataRowField.FormattedValue = object[key] ? object[key].toString() : '';
                break;
        }

        return dataRowField;
    }

    onListChange(event) {
    }

    onCustomizeFieldClick(event) {
        
    }

    selectedRowsChanged(selectedRowsCount) {
    }
}
