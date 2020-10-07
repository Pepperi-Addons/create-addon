
function js_foo(client, request)
{
   return "test";
};
var api2={}
api2.js_foo = js_foo;
//module.exports.goo = goo;

export default api2;