import MyService from './my.service'
import JavascriptService from './my.javascript.service.js'


interface Client {
    BaseURL: string;
    OAuthAccessToken: string;
    Module: any
}

interface Request {
    body: any,
    query: any
}

// add functions here
// this function will run on the 'api/foo' endpoint
export async function foo(client: Client, request: Request) {
    const service = new MyService();
    service.doSomething();
    
    return {
        hello: 'world', 
        client, 
        request
    }
};

export async function foo1(client: Client, request: Request) {
    return JavascriptService.goo();
}
