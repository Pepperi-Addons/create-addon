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
        const parsedToken: any = jwtdecode(token);
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
        try {
            const file = req.params['file'];
            const funcName = req.params['func'];
            const mod = await import('./' + file);
            const func = mod[funcName];
            var result = await func(this.createClient(req), this.createRequest(req));
            res.status(200).json(result);
        } catch (error) {
            console.log('error :', error);
            res.status(500).json({ message: error.message, stack: error.stack});
        }
    }
}

dotenv.config();
const server = new Server();
server.start();