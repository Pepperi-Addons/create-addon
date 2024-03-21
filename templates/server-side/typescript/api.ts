import { Client, Request } from '@pepperi-addons/debug-server'

export async function test(client: Client, request: Request): Promise<{Hello: string}> {
    return {
        Hello: 'World'
    }
}
