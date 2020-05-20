"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugServer = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var request_promise_1 = __importDefault(require("request-promise"));
var cors_1 = __importDefault(require("cors"));
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var DebugServer = /** @class */ (function () {
    function DebugServer(options) {
        var _this = this;
        this.app = express_1.default();
        this.port = options.port || 4400;
        this.addonUUID = options.addonUUID || '';
        this.apiDirectory = options.apiDirectory || process.cwd();
        this.app.use(body_parser_1.default.json());
        this.app.use(cors_1.default());
        this.app.all('/:file/:func', function (req, res) {
            _this.handler(req, res);
        });
    }
    DebugServer.prototype.start = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("listening on http://localhost:" + _this.port);
        });
    };
    DebugServer.prototype.addStaticFolder = function (virtualPath, path) {
        this.app.use(virtualPath, express_1.default.static(path));
    };
    DebugServer.prototype.createClient = function (req) {
        var authorization = req.header('Authorization') || '';
        if (!authorization) {
            throw new Error("unauthorized");
        }
        var token = authorization.replace('Bearer ', '') || '';
        var parsedToken = jwt_decode_1.default(token);
        return {
            AddonUUID: this.addonUUID,
            BaseURL: parsedToken['pepperi.baseurl'],
            OAuthAccessToken: token,
            Module: {
                rp: request_promise_1.default,
                jwtDecode: jwt_decode_1.default
            }
        };
    };
    DebugServer.prototype.createRequest = function (req) {
        return {
            method: req.method,
            body: req.body,
            query: req.query
        };
    };
    DebugServer.prototype.handler = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, file, funcName, filePath, mod, func, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        res.status(200);
                        file = req.params['file'];
                        funcName = req.params['func'];
                        filePath = this.apiDirectory + '/' + file;
                        return [4 /*yield*/, require(filePath)];
                    case 2:
                        mod = _a.sent();
                        func = mod[funcName];
                        return [4 /*yield*/, func(this.createClient(req), this.createRequest(req))];
                    case 3:
                        result = _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        ex_1 = _a.sent();
                        console.log('error :', ex_1);
                        // set the correct status code
                        if (ex_1.message == "unauthorized") {
                            res.status(401);
                        }
                        else {
                            res.status(500);
                        }
                        result = { message: ex_1.message, stack: ex_1.stack };
                        return [3 /*break*/, 6];
                    case 5:
                        res.json(result);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return DebugServer;
}());
exports.DebugServer = DebugServer;
