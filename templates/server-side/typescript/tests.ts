import { Client, Request } from '@pepperi-addons/debug-server/dist';
import { TestRunner, BaseTest } from '@pepperi-addons/addon-testing-framework';
import * as Tests from './integration-tests';

export async function tests(client: Client, request: Request) {
    if (request.method === 'GET') {
        // return a list of all tests
        return Object.keys(Tests).map((key) => {
            return {
                Name: key,
            };
        });
    } else if (request.method === 'POST') {
        // run a specific test
        const testName = request.body.Name;
        if (!testName) {
            throw new Error('Missing body parameter: Name');
        }
        if (typeof testName !== 'string') {
            throw new Error('Body parameter: Name must be a string');
        }
        const Test: new () => BaseTest = Tests[testName];
        if (!Test) {
            throw new Error(`Test ${testName} not found`);
        }
        return new TestRunner(client, request).run(new Test());
    }
}
