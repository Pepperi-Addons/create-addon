import { Injectable, Input } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

//@ts-ignore
import {UserService} from 'pepperi-user-service';

import jwt from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AddonApiService
{
    papiBaseURL = ''
    addonData: any = {}


    constructor(
        private userService: UserService,
        private httpClient: HttpClient
    ) {
        const parsedToken = jwt(this.userService.getUserToken());
        this.papiBaseURL = parsedToken['pepperi.baseurl']
    }

    getAddonApiBaseURL(): string {
        const dev = (this.userService.getAddonStaticFolder() as string).indexOf('localhost') > -1;
        return dev ? "http://localhost:4400" : `${this.papiBaseURL}/addons/api/${this.addonData.Addon.UUID}`;
    }

    getAddonStaticFolderURL(): string {
        return this.userService.getAddonStaticFolder();
    }

    get(url) {
        const options = { 
            'headers': {
                'Authorization': 'Bearer ' + this.userService.getUserToken()
            }
        };
        return this.httpClient.get(this.getAddonApiBaseURL() + url, options);
    }
}