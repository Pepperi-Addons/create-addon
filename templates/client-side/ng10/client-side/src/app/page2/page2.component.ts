import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PepGroupButtonsViewType, PepGroupButton } from '@pepperi-addons/ngx-lib/group-buttons';


import { CustomizationService, HttpService, ObjectSingleData, DataConvertorService,
     PepRowData, PepFieldData, AddonService, FIELD_TYPE, UtilitiesService } from '@pepperi-addons/ngx-lib';
import { PepColorType } from '@pepperi-addons/ngx-lib/color';

import { PepListComponent, ChangeSortingEvent, VIEW_TYPE } from '@pepperi-addons/ngx-lib/list';
import { FakeData } from './page2.fake-data';

export enum AddonType {
  System = 1,
  Public = 2,
  Distributor = 3,
  Dev = 4
}

@Component({
  selector: 'addon-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit {
  title = 'pepperi web app test';
  color = 'hsl(100, 100%, 25%)';
  value = '';
  richTextValue = '<iframe width="500px" src="https://rerroevi.sirv.com/Website/Fashion/Pinkpurse/Pinkpurse.spin"/>';

  groupButtons: Array<PepGroupButton>;
  GROUP_BUTTONS_VIEW_TYPE = PepGroupButtonsViewType;

  colorType = PepColorType.AnyColor;

  addons = FakeData.Addons;
  @ViewChild(PepListComponent) customList: PepListComponent;

  constructor(
      private translate: TranslateService,
      private customizationService: CustomizationService,
      private utilitiesService: UtilitiesService,
      private dataConvertorService: DataConvertorService,
      private httpService: HttpService,
      private addonService: AddonService
  ) {

      const browserCultureLang = translate.getBrowserCultureLang();
      this.groupButtons = [
          { 'Value': 'test', 'Class': '', 'Callback': () => this.onGroupButtonClicked(event, 'test'), 'Icon': null },
          { 'Value': '', 'Class': 'caution', 'Callback': () => this.onGroupButtonClicked(event, 'del'), 'Icon': 'system_bin' },
      ];
  }

  ngOnInit() {
      this.customizationService.setThemeVariables();

      // this.httpService.getHttpCall('http://get_data')
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

  ngAfterViewInit() {
      this.loadlist('all');
  }

  onMenuItemClicked(event) {
      alert(event.apiName);
  }

  onGroupButtonClicked(event, title) {
      alert(title);
  }

  onValueChanged(event) {
      // alert(event.value);
      // debugger;
      // this.checkForChanges = new Date();

      if (event.apiName == 'color1') {
          this.color = event.value;
      } else {
          this.value = 'changed';
      }
  }

  elementClicked(event) {
      // debugger;
      this.value = 'Click';
      // alert("clicked");
  }

  loadlist(apiEndpoint) {
      const endpoint = 'addons';
      const addonManagerUUID = 'bd629d5f-a7b4-4d03-9e7c-67865a6d82a9';
      const url = 'https://papi.sandbox.pepperi.com/v1.0/addons/installed_addons';

      // this.addonService.getAddonApiCall(addonManagerUUID, 'api', endpoint)
      // this.httpService.getHttpCall(url)
      //     .subscribe(
      //         (res) => {
      //             debugger;
      //             this.loadAddons(res.Addons);
      //         },
      //         (error) => {
      //             debugger;
      //             console.log(error);
      //         },
      //         () => {
      //             debugger;
      //         }
      //     );

      this.loadAddons(this.addons);
  }

  loadAddons(addons) {
      if (this.customList && addons) {
          const tableData = new Array<PepRowData>();
          addons.forEach((addon: any) => {
              const userKeys = ['Name', 'Description', 'Version'];
              const supportUserKeys = ['Type', 'AutomaticUpgrade' ];
              const allKeys = [ ...userKeys,  ...supportUserKeys];
              tableData.push(this.convertAddonToPepRowData(addon, allKeys));
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

          this.customList.initListData(pepperiListObj.UIControl, buffer.length, buffer, VIEW_TYPE.Table, '', true);
      }
  }

  convertAddonToPepRowData(addon: any, customKeys = null) {
      const row = new PepRowData();
      row.Fields = [];
      const keys = customKeys ? customKeys : Object.keys(addon);
      keys.forEach(key => row.Fields.push(this.initDataRowField(addon, key)));
      return row;
  }

  initDataRowField(addon: any, key: any): PepFieldData {

      const dataRowField: PepFieldData = {
          ApiName: key,
          Title: this.translate.instant(key),
          XAlignment: 1,
          FormattedValue: addon[key] ? addon[key].toString() : '',
          Value:  addon[key] ? addon[key].toString() : '',
          ColumnWidth: 10,
          AdditionalValue: '',
          OptionalValues: [],
          FieldType: FIELD_TYPE.TextBox

      };

      // addon.Addon.UUID === '00000000-0000-0000-0000-000000000a91' ? this.currentApiVersion = addon.Version : null;
      const versions = this.utilitiesService.isJsonString(addon.AdditionalData) ? JSON.parse(addon.AdditionalData) : {};
      const hasVersions = versions && (versions.LatestPhased || (versions.AllVersions && versions.AllVersions.length > 0)) ? true : false;
      versions && versions.LatestPhased ? versions.AllVersions.push(versions.LatestPhased) : null;
      const installed = addon.UUID !== '';
      const systemData = this.utilitiesService.isJsonString(addon.SystemData) ? JSON.parse(addon.SystemData.toString()) : {};
      const currentVersion = hasVersions ?
          versions.AllVersions.filter(version => (version && addon && version.Version === addon.Version))[0]
          : null;

      const isLatestPhased = currentVersion && versions && versions.LatestPhased ?
      currentVersion.Version === versions.LatestPhased.Version ||
      !(Date.parse(currentVersion.CreationDateTime) < Date.parse(versions.LatestPhased.StartPhasedDateTime) &&
      (Date.parse(versions.LatestPhased.StartPhasedDateTime) <= Date.now() || versions.LatestPhased.StartPhasedDateTime === null))
          : true;
      const isLatestAvailable = currentVersion && hasVersions ?
          (versions.AllVersions.filter(version => version))
              .filter(ver => ver.Version !== currentVersion.Version &&
                  (Date.parse(ver.CreationDateTime) > Date.parse(currentVersion.CreationDateTime))).length === 0
          : true;

      switch (key) {
          case 'Type':
              const addonType = addon.Addon && addon.Addon[key] && AddonType[addon.Addon[key]] ? AddonType[addon.Addon[key]] : '';
              dataRowField.FormattedValue = addonType;
              dataRowField.AdditionalValue =
              dataRowField.Value = addonType;
              break;
          case 'Description':
              dataRowField.ColumnWidth = 25;
              dataRowField.AdditionalValue = addon.Addon.Type;
              dataRowField.FormattedValue = addon.Addon[key] ? addon.Addon[key] : '';
              dataRowField.Value =  addon.Addon[key] ? addon.Addon[key] : '';
              break;
          case 'Name':
              dataRowField.ColumnWidth = 15;
              dataRowField.AdditionalValue = addon.Addon.UUID;
              dataRowField.FormattedValue =  addon.Addon[key] ? addon.Addon[key] : '';
              dataRowField.Value =  addon.Addon[key] ? addon.Addon[key] : '';
              break;
          case 'Version':
              dataRowField.AdditionalValue = JSON.stringify(
                  { LatestPhased: isLatestPhased,
                    LatestAvailable: isLatestAvailable,
                    HasVersions: hasVersions,
                    Installed: installed
                  });
              dataRowField.OptionalValues = hasVersions ? versions.AllVersions : [];
              if (!installed) {
                  dataRowField.FormattedValue = `${this.translate.instant('NotInstalled')}`;
              } else if (installed) {
                  dataRowField.FormattedValue = !isLatestPhased ?
                  `${addon[key]} ${this.translate.instant('UpdateAvailable')}` :
                  !hasVersions ? `${addon[key]} ${this.translate.instant('Obsolete')}` :
                  `${addon[key]}`;
              }

              break;

          case 'AutomaticUpgrade':
              dataRowField.FieldType = FIELD_TYPE.Boolean;
              const automaticUpgrade = systemData.AutomaticUpgrade ? systemData.AutomaticUpgrade : true;
              dataRowField.FormattedValue = automaticUpgrade !== undefined ? automaticUpgrade : false;
              dataRowField.Value = automaticUpgrade !== undefined ? automaticUpgrade : false;
              break;
          default:
              dataRowField.FormattedValue = addon[key] ? addon[key].toString() : '';
              break;
      }

      return dataRowField;
  }

  onListChange(event) {
      // debugger;
  }


  onCustomizeFieldClick(event) {
      // debugger;
  }

  selectedRowsChanged(selectedRowsCount) {
      // debugger;
  }




}
