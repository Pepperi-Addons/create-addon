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
// the real function is runnning on another typescript file
export async function foo(client: Client, request: Request) {
    const service = new MyService();
    service.doSomething();
    
    return {
        hello: 'world', 
        client, 
        request
    }
};

// this function will run on api/js_foo endpoint
// note that the code here is running from a javascript file
export async function js_foo(client: Client, request: Request) {
    return JavascriptService.js_foo(client, request);
}
