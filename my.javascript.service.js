
function goo(client, request)
{
   return "test";
};
var api2={}
api2.goo = goo;
//module.exports.goo = goo;

export default api2;