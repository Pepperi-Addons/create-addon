import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Optional,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  PepHttpService,
  PepDataConvertorService,
  PepLayoutService,
  PepRowData,
  PepFieldData,
  FIELD_TYPE,
  PepScreenSizeType,
  PepGuid,
} from '@pepperi-addons/ngx-lib';
import { IPepFormFieldClickEvent } from '@pepperi-addons/ngx-lib/form';
import {
  IPepListChooserOptionChangeEvent,
  IPepListSortingOptionChangeEvent,
  PepListComponent,
  IPepListSortingOption,
  IPepListView,
  IListViewChangeEvent,
} from '@pepperi-addons/ngx-lib/list';
import {
  PepMenuItem,
  IPepMenuItemClickEvent,
} from '@pepperi-addons/ngx-lib/menu';
import {
  PepFooterStateType,
  IPepFooterStateChangeEvent,
} from '@pepperi-addons/ngx-lib/top-bar';

import { DataView, GridDataViewField, DataViewFieldType, DataViewFieldTypes } from '@pepperi-addons/papi-sdk/dist/entities/data-view';

export interface GenericListDataSource {
    getList(state: { searchString: string }): Promise<any[]>;
    getDataView(): Promise<DataView>;
    getActions(objs: any[]): Promise<{
        title: string;
        handler: (obj: any) => Promise<void>;
    }[]>;
}

@Component({
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss'],
  selector: 'generic-list'
})
export class GenericListComponent implements OnInit, AfterViewInit {
  @ViewChild(PepListComponent) customList: PepListComponent;
  
  @Input()
  dataSource: GenericListDataSource;
  dataObjects: any[] = []

  searchString: string = '';

  @Input()
  title: string = ''

  @Input()
  inline: boolean = false;

  @Input()
  showSearch: boolean = false;

  @Input()
  allowSelection: boolean = true;

  @Input()
  allowMultipleSelection: boolean = false;

  menuHandlers: { [key: string]: (obj: any) => Promise<void> }
  menuActions: Array<PepMenuItem>;
  PepScreenSizeType = PepScreenSizeType;
  screenSize: PepScreenSizeType;

  constructor(
      private dataConvertorService: PepDataConvertorService,
      private layoutService: PepLayoutService,
      // private httpService: PepHttpService,
      private translate: TranslateService
  ) {
      this.layoutService.onResize$.pipe().subscribe((size) => {
          this.screenSize = size;
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
      this.reload();
  }

  private loadMenuItems(): void {
    if (this.allowSelection) {
      this.getMenuActions().then(x => this.menuActions = x);
    }
  }

  async getMenuActions(): Promise<PepMenuItem[]> {
    const actions = await this.dataSource.getActions(this.getMenuObjects());
    const res: PepMenuItem[] = []
    this.menuHandlers = {};

    actions.forEach(item => {
      const uuid = PepGuid.newGuid();
      this.menuHandlers[uuid] = item.handler;
      res.push({
        key: uuid,
        text: item.title
      })
    })

    return res;
  }

  getMenuObjects() {
    let uuids = this.customList.getSelectedItemsData().rows ?? [];
    if (this.customList.getIsAllSelectedForActions()) {
      uuids = this.dataObjects.map(obj => obj.UID).filter(x => uuids.indexOf(x) === -1);
    }
    const objects = uuids.map(uuid => this.getObject(uuid))
    return objects;
  }

  getObject(uuid: string) {
    return this.dataObjects.find(obj => obj.UID === uuid);
  }

  onMenuItemClicked(action: IPepMenuItemClickEvent): void {
    this.menuHandlers[action.source.key](this.getMenuObjects());
  }

  onSearchChanged($event) {
    this.searchString = $event.value
    this.reload();
  }

  async reload() {
      if (this.customList && this.dataSource) {
          this.dataObjects = await this.dataSource.getList({
            searchString: this.searchString
          });
          const dataView = await this.dataSource.getDataView();
          const tableData = this.dataObjects.map(x => this.convertToPepRowData(x, dataView));
          const data = this.dataConvertorService.convertListData(tableData);
          data.forEach((obj, i) => {
            this.dataObjects[i].UID = obj.UID;
          })
          const uiControl = this.dataConvertorService.getUiControl(tableData[0]);
          this.customList.initListData(uiControl, data.length, data, 'table');
        
          this.loadMenuItems();
      }
  }

  convertToPepRowData(object: any, dataView: DataView) {
      const row = new PepRowData();
      row.Fields = [];

      for (const field of dataView.Fields as GridDataViewField[]) {
          row.Fields.push({
            ApiName: field.FieldID,
            Title: this.translate.instant(field.Title),
            XAlignment: 1,
            FormattedValue: object[field.FieldID] || '',
            Value: object[field.FieldID] || '',
            ColumnWidth: 10,
            AdditionalValue: '',
            OptionalValues: [],
            FieldType: DataViewFieldTypes[field.Type],
            ReadOnly: field.ReadOnly,
            Enabled: !field.ReadOnly
        })
      }
      return row;
  }

  onAnimationStateChange(state): void { }

  onCustomizeFieldClick(fieldClickEvent: IPepFormFieldClickEvent) { }

  selectedRowsChanged(selectedRowsCount: number) {
    this.loadMenuItems();
  }

  @Output()
  onAddClicked = new EventEmitter<void>();

}
