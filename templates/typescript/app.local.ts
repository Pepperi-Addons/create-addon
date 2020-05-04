import express from 'express';
import bodyParser from 'body-parser';
import rp from 'request-promise';
import cors from 'cors';
import dotenv from 'dotenv'
import jwtdecode from 'jwt-decode';

class Server {
    app: express.Application

    constructor() {
        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(cors());
        // this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.all('/:file/:func', (req: express.Request, res: express.Response) => {
            this.handler(req, res);
        })
    }

    start() {
        this.app.listen(process.env.PORT);
        console.log(`listening on http://localhost:${process.env.PORT}`);
    }

    createClient(req: express.Request) {
        const token = req.header('Authorization')?.replace('Bearer ', '') || '';
        let parsedToken: any;
        try {
            parsedToken = jwtdecode(token);
            // check experation :)
            //if (Date.now() / 1000 > parsedToken.exp) throw new Error("unauthorized");
        }
        catch(ex)
        {
            throw new Error("unauthorized");
        }

        console.log(parsedToken);
        return {
            BaseURL: parsedToken['pepperi.baseurl'],
            OAuthAccessToken: token,
            Module: {
                rp
            }
        };
    }

    createRequest(req: any) {
        return {
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
            const mod = await import('./' + file);
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

dotenv.config();
const server = new Server();
server.start();