// The comment below disables the eslint camelcase rule for the whole file.
// You can copy it to other files providing endpoints to your addon.
/* eslint camelcase: 0 */

import { Client, Request } from '@pepperi-addons/debug-server'

export async function test(client: Client, request: Request) {
    return {
        Hello: 'World'
    }
};

