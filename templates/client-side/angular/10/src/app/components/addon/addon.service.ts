import jwt from 'jwt-decode';
import { PapiClient } from '@pepperi-addons/papi-sdk';
import { Injectable } from '@angular/core';

import {PepAddonService, PepHttpService, PepDataConvertorService, PepSessionService} from '@pepperi-addons/ngx-lib';

import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';

@Injectable({ providedIn: 'root' })
export class AddonService {

    accessToken = '';
    parsedToken: any
    papiBaseURL = ''
    pluginUUID;

    get papiClient(): PapiClient {
        return new PapiClient({
            baseURL: this.papiBaseURL,
            token: this.session.getIdpToken(),
            addonUUID: this.pluginUUID,
            suppressLogging:true
        })
    }

    constructor(
        public addonService:  PepAddonService
        ,public session:  PepSessionService
        ,public httpService: PepHttpService
        ,public pepperiDataConverter: PepDataConvertorService
        ,public dialogService: PepDialogService
    ) {
        const accessToken = this.session.getIdpToken();
        this.parsedToken = jwt(accessToken);
        this.papiBaseURL = this.parsedToken["pepperi.baseurl"]
    }
}
