import { Injectable, Input } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

//@ts-ignore
import {UserService} from 'pepperi-user-service';

import jwt from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AddonApiService
{
    isInDevMode = false
    addonUUID = ''
    addonVersion = 'v1.0'
    accessToken = ''
    parsedToken: any
    papiBaseURL = ''
    cdnBaseURL = 'cdn.staging.pepperi.com'
    localhostBaseURL = "http://localhost:4400"


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private httpClient: HttpClient
    ) {
        this.route.params.subscribe(params => {
            this.addonUUID = params.pluginID;
        });

        this.route.queryParams.subscribe(params => {
            this.isInDevMode = params['dev'] || false;
        });

        this.accessToken = this.userService.getUserToken();
        this.parsedToken = jwt(this.accessToken);
        this.papiBaseURL = this.parsedToken['pepperi.baseUrl']
    }

    getAddonApiBaseURL(): string {
        return this.isInDevMode ? this.localhostBaseURL : `${this.papiBaseURL}/addons/api/${this.addonUUID}`;
    }

    getAddonStaticFolderURL(): string {
        var baseURL = this.isInDevMode ? this.localhostBaseURL : this.cdnBaseURL;
        return `${baseURL}/Addon/Public/${this.addonUUID}/${this.addonVersion}/`;
    }

    get(url) {
        const options = { 
            'headers': {
                'Authorization': 'Bearer ' + this.accessToken
            }
        };
        return this.httpClient.get(this.getAddonApiBaseURL() + url, options);
    }
}