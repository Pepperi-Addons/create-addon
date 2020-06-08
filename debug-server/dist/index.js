"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugServer = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
class DebugServer {
    constructor(options) {
        this.app = express_1.default();
        this.port = options.port || 4400;
        this.addonUUID = options.addonUUID || '';
        this.apiDirectory = options.apiDirectory || process.cwd();
        this.app.use((req, res, next) => {
            console.log(`Request URL: http://localhost:${this.port}${req.url}`);
            next();
        });
        this.app.use(body_parser_1.default.json());
        this.app.use(cors_1.default());
        this.app.all('/:file/:func', (req, res) => {
            this.handler(req, res);
        });
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`listening on http://localhost:${this.port}`);
        });
    }
    addStaticFolder(virtualPath, path) {
        this.app.use(virtualPath, express_1.default.static(path));
    }
    createClient(req) {
        const authorization = req.header('Authorization') || '';
        if (!authorization) {
            throw new Error("unauthorized");
        }
        const token = authorization.replace('Bearer ', '') || '';
        let parsedToken = jwt_decode_1.default(token);
        return {
            AddonUUID: this.addonUUID,
            BaseURL: parsedToken['pepperi.baseurl'],
            OAuthAccessToken: token
        };
    }
    createRequest(req) {
        return {
            method: req.method,
            body: req.body,
            query: req.query
        };
    }
    async handler(req, res) {
        var result = {};
        try {
            res.status(200);
            const file = req.params['file'];
            const funcName = req.params['func'];
            const filePath = this.apiDirectory + '/' + file;
            const mod = await require(filePath);
            const func = mod[funcName];
            result = await func(this.createClient(req), this.createRequest(req));
        }
        catch (ex) {
            console.log('error :', ex);
            // set the correct status code
            if (ex.message == "unauthorized") {
                res.status(401);
            }
            else {
                res.status(500);
            }
            result = { message: ex.message, stack: ex.stack };
        }
        finally {
            res.json(result);
        }
    }
}
exports.DebugServer = DebugServer;
