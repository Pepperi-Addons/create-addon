import {
    Component,
    // EventEmitter,
    // Input,
    // Output,
    OnInit,
    // ViewEncapsulation,
    // Compiler,
    // ViewChild,
    // OnDestroy,
} from "@angular/core";
// import { TranslateService } from "@ngx-translate/core";
// import { PepLayoutService, PepScreenSizeType } from '@pepperi-addons/ngx-lib';
// import { AddonService } from './addon.service';


@Component({
  selector: 'addon-addon',
  templateUrl: './addon.component.html',
  styleUrls: ['./addon.component.scss']
})
export class AddonComponent implements OnInit {
    // screenSize: PepScreenSizeType;
    addon;

    constructor(
        // public service: AddonService,
        // private translate: TranslateService,
        // public layoutService: PepLayoutService,
    ) {

        // Parameters sent from url
        // translate.setDefaultLang('en');
        // let userLang = translate.getBrowserLang().split("-")[0]; // use navigator lang if available
        // translate.use(userLang);
        // this.layoutService.onResize$.subscribe(size => this.screenSize = size);

    }

  async ngOnInit() {
    //   this.addon = await this.service.getAddon();
  }

}
