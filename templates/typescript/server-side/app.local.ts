import DebugServer from '@pepperi-addons/debug-server'
import config from '../addon.config.json';

const dir = __dirname;
const server = new DebugServer({
    port: 4300,
    addonUUID: process.env.AddonUUID,
    apiDirectory: dir
});

// serve the plugin file locally
server.addStaticFolder(`/assets/plugins/${config.AddonUUID}/${config.AddonVersion}`, process.cwd() +  '/../publish');

// serve the plugin assets locally
server.addStaticFolder(`/Addon/Public/${config.AddonUUID}/${config.AddonVersion}`, process.cwd() +  '/../publish');

server.start();