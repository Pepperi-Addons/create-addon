import { BaseTest } from '@pepperi-addons/addon-testing-framework';

/**
 * This class is an example of an integration test.
 * It is exported by the index.ts file, and can be run by POST to the /tests/tests endpoint.
 */
export class AddonTests extends BaseTest {

    title = 'Addon Tests';

    tests(
        describe: (suiteTitle: string, func: () => void) => void,
        it: (name: string, fn: Mocha.Func) => void,
        expect: Chai.ExpectStatic,
    ): void {
        describe('Addon Tests', () => {

            it('should fail - add some tests', () => {
                expect.fail();
            });
        });
    }
}
