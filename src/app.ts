import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';

class App {
    public app: express.Application;

    public constructor () {
        this.app = express();

        this.middlewares();
        this.routes();
    }

    private middlewares () {
        this.app.use(cors({
            methods: ['POST', 'GET', 'PUT', 'DELETE']
        }));
        this.app.use(express.json());
        this.app.use(helmet());
    }

    private routes () {
        this.app.use(routes);
        this.app.get('/', (req, resp) => {
            resp.send('Hello World!');
        });
    }
}

export default new App().app;
