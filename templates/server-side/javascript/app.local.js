const DebugServer = require('@pepperi-addons/debug-server');
const dotenv = require('dotenv');

dotenv.config();
const server = new DebugServer(process.env.PORT, process.env.AddonUUID);
server.start();