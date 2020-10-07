
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The erroeMessage is importent! it will be written in the audit log and help the user to understand what happen
*/


exports.install = async (Client, Request) => {
    return {success:true}
}
exports.uninstall = async (Client, Request) => {
    return {success:true}
}
exports.upgrade = async (Client, Request) => {
    return {success:true}
}
exports.downgrade = async (Client, Request) => {
    return {success:true}
}