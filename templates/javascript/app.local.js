const express = require('express');
const bodyParser = require('body-parser');
const rp = require('request-promise')
const cors = require('cors')
const dotenv = require('dotenv')
const jwtdecode = require('jwt-decode')

class Server {
    
    constructor() {
        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(cors());
        // this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.all('/:file/:func', (req, res) => {
            this.handler(req, res);
        })
    }

    start() {
        this.app.listen(process.env.PORT);
        console.log(`listening on http://localhost:${process.env.PORT}`);
    }

    createClient(req) {
        const token = req.header('Authorization').replace('Bearer ', '') || '';
        let parsedToken = '';
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

    createRequest(req) {
        return {
            body: req.body,
            query: req.query
        };
    }

    async handler(req, res) {
        
        var result= {};
        try {
            res.status(200);
            const file = req.params['file'];
            const funcName = req.params['func'];
            const mod = await require('./' + file);
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