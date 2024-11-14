import "dotenv/config"
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/router';


export default class App {
    protected app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.start();
    }

    protected config() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use('api/', router);
    }

    protected start() {
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`running on port ${port}`)
        })
    }
}