import express, { request } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwtDecode from 'jwt-decode'

export interface Client {
    AddonUUID: string,
    BaseURL: string,
    OAuthAccessToken: string
}

export interface Request {
    method: string,
    body: any, 
    query: any
}

interface DebugServerOptions {
    port?: number,
    addonUUID?: string,
    apiDirectory?: string
}

export class DebugServer {
    
    app: express.Application
    port: number
    addonUUID: string
    apiDirectory: string

    constructor(options: DebugServerOptions) {
        
        this.app = express();
        this.port = options.port || 4400;
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
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`listening on http://localhost:${this.port}`);
        });
    }

    addStaticFolder(virtualPath: string, path: string) {
        this.app.use(virtualPath, express.static(path));
    }

    createClient(req: express.Request): Client {
        const authorization = req.header('Authorization') || '';

        if (!authorization) {
            throw new Error("unauthorized");
        }

        const token = authorization.replace('Bearer ', '') || '';
        let parsedToken = jwtDecode<any>(token);

        return {
            AddonUUID: this.addonUUID,
            BaseURL: parsedToken['pepperi.baseurl'],
            OAuthAccessToken: token
        };
    }

    createRequest(req: express.Request): Request {
        return {
            method: req.method,
            body: req.body,
            query: req.query
        };
    }

    async handler(req: express.Request, res: express.Response) {
        
        var result= {};
        try {
            res.status(200);
            const file = req.params['file'];
            const funcName = req.params['func'];
            const filePath = this.apiDirectory + '/' + file;
            const mod = await require(filePath);
            const func = mod[funcName];
            result = await func(this.createClient(req), this.createRequest(req));
            
        } catch (ex) {
            console.log('error :', ex);
            // set the correct status code
            if(ex.message == "unauthorized") {
                res.status(401);
            }
            else {
                res.status(500);
            }
            result = { message: ex.message, stack: ex.stack};
        }
        finally
        {
            res.json(result);
        }
    }
}