import { BaseTest } from '@pepperi-addons/addon-testing-framework';

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
