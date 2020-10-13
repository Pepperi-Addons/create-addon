const MyService = require('./my.service');

async function foo(client, request) {
    const service = new MyService();
    service.doSomething();
    
    return {
        hello: 'world', 
        client, 
        request
    }
};

exports.foo = foo;