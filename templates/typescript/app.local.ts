import DebugServer from '@pepperi-addons/debug-server'
import dotenv from 'dotenv';

dotenv.config();
const dir = process.cwd() + "/build";
const server = new DebugServer({
    port: process.env.PORT,
    addonUUID: process.env.AddonUUID,
    apiDirectory: dir
});
server.start();