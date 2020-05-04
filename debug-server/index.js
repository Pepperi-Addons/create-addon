const express = require('express');
const bodyParser = require('body-parser');
const rp = require('request-promise')
const cors = require('cors');
const jwtdecode = require('jwt-decode')

class DebugServer {
    
    constructor(options) {
        this.app = express();
        this.port = options.port | 3000;
        this.addonUUID = options.addonUUID || '';
        this.apiDirectory = options.apiDirectory || process.cwd();

        this.app.use(bodyParser.json());
        this.app.use(cors());
        // this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.all('/:file/:func', (req, res) => {
            this.handler(req, res);
        })
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`listening on http://localhost:${this.port}`);
        });
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
            AddonUUID: this.addonUUID,
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

module.exports = DebugServer;