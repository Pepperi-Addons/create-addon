/* eslint-disable @typescript-eslint/no-unused-vars */
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, errorMessage:{the reason why it is false}}
The error Message is important! it will be written in the audit log and help the user to understand what happen
*/

interface AddonAPISyncResult {
    success: boolean;
    errorMessage?: string;
    resultObject?: unknown;
}

import { Client, Request } from '@pepperi-addons/debug-server';
import { RelationsService } from './services/relations.service';

export async function install(client: Client, request: Request): Promise<AddonAPISyncResult> {
    try {
        const service = new RelationsService(client);
        await service.upsertRelations();
    } catch (err) {
        throw new Error(`Failed to create relations. error - ${err}`);
    }

    return { success: true, resultObject: {} };
}

export async function uninstall(client: Client, request: Request): Promise<AddonAPISyncResult> {
    return {success: true, resultObject: {}}
}

export async function upgrade(client: Client, request: Request): Promise<AddonAPISyncResult> {
    return {success: true, resultObject: {}}
}

export async function downgrade(client: Client, request: Request): Promise<AddonAPISyncResult> {
    return {success: true, resultObject: {}}
}
