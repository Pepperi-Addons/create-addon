import express, { request } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwtDecode from 'jwt-decode'
import path from 'path'
import fs from 'fs'

export interface Client {
    AddonUUID: string;
    BaseURL: string;
    AssetsBaseUrl: string;
    OAuthAccessToken: string;
    Retry: (delay: number) => void;
    CodeRevisionURL?: string;
    AddonSecretKey?: string;
    ExecutionUUID?: string;
    NumberOfTry?: number;
    Module?: any;
    ActionUUID?: string;
    ValidatePermission: (policyName: string) => Promise<void>;
}


export interface Request {
    method: string;
    body: any;
    query: any;
    originalUrl?: string;
    path?: string;
    header: any;
}

interface DebugServerOptions {
    port?: number,
    addonUUID?: string,
    apiDirectory?: string
}

export class DebugServer {
    app: express.Application;
    port: number;
    addonUUID: string;
    apiDirectory: string;
    assetsDirectory: string;

    constructor(options: DebugServerOptions) {

        this.app = express();
        this.port = options.port || 4500;
        this.addonUUID = options.addonUUID || '';
        this.apiDirectory = options.apiDirectory || process.cwd();
        this.app.use((req, res, next) => {
            console.log(`Request URL: http://localhost:${this.port}${req.url}`);
            next();
        })
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.all('/:file/:func', (req, res) => {

            this.handler(req, res);
        })

        let assetsRelativePath = 'publish/assets';
        this.addStaticFolder(`/${assetsRelativePath}`, process.cwd() + `/../${assetsRelativePath}`);
        this.assetsDirectory = `http://localhost:${this.port}/${assetsRelativePath}`;
    }

    async getSecret(): Promise<string> {
        return new Promise((resolve, reject) => {
            const secretFile = path.join(process.cwd(), '/../var_sk');
            const exist = fs.existsSync(secretFile);
            if (!exist) {
                reject(new Error(`Missing var_sk file in current directory`));
            }
            else {
                fs.readFile(secretFile, (err, data) => {
                    if (err) {
                        reject(new Error(`Error reading var_sk file: ${err}`));
                    }
                    else if (!data) {
                        reject(new Error('Secret is empty. Are you sure you have it?'));
                    }
                    else {
                        resolve(data.toString());
                    }
                })
            }
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`listening on http://localhost:${this.port}`);
        });
    }

    addStaticFolder(virtualPath: string, path: string) {
        this.app.use(virtualPath, express.static(path));
    }

    async createClient(req: express.Request): Promise<Client> {
        const authorization = req.header('Authorization') || '';

        if (!authorization) {
            throw new Error("unauthorized");
        }

        const token = authorization.replace('Bearer ', '') || '';
        let parsedToken = jwtDecode<any>(token);
        const sk = await this.getSecret() || '';

        return {
            AddonUUID: this.addonUUID,
            AddonSecretKey: sk,
            BaseURL: parsedToken['pepperi.baseurl'],
            OAuthAccessToken: token,
            AssetsBaseUrl: this.assetsDirectory,
            Retry: () => { },
            ValidatePermission: async () => { }
        };
    }

    createRequest(req: express.Request): Request {
        return {
            method: req.method,
            body: req.body,
            query: req.query,
            header: req.headers,
        };
    }

    async handler(req: express.Request, res: express.Response) {

        var result = {};
        try {
            res.status(200);
            const file = req.params['file'];
            const funcName = req.params['func'];
            const filePath = this.apiDirectory + '/' + file;
            const mod = await require(filePath);
            const func = mod[funcName];
            result = await func(await this.createClient(req), this.createRequest(req));

        } catch (ex) {
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