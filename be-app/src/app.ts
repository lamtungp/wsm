import express, { Application } from 'express';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import passport from 'passport';
import cluster from 'cluster';
import process from 'process';
import { cpus } from 'os';

import RequestLogger from './helpers/logger';
import { Environment } from '../config';
import indexRouter from './routes/index';
import { errorHandler } from './middlewares/errorHandler';
import requestValidationHandler from './helpers/requestValidationHandler';
import { passportConfiguration } from './lib/passports';
import swaggerOptions from './docs';
import { router } from './lib/bullboard';

class App {
  private app: Application;
  public port: number;
  public apiPrefix = 'api/v1';

  constructor(appInit: { port: number; middleWares: any }) {
    this.app = express();
    this.port = appInit.port;
    this.assets();
    this.middleWares(appInit.middleWares);
    this.initRoutes();
    this.swaggerDocuments();
    this.handleError();
  }

  private assets() {
    if (process.env.NODE_ENV === Environment.Production) {
      this.app.use(compress());
      this.app.use(helmet());
    } else {
      this.app.use(cors());
      passportConfiguration(passport);
      this.app.use(passport.initialize());
    }
  }

  private middleWares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private initRoutes() {
    //api app
    this.app.use(this.apiPrefix, indexRouter);

    //api queue email
    this.app.use('/queues', router);
  }

  private swaggerDocuments() {
    // api swagger
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  }

  private handleError() {
    // Handle common errors
    if (process.env.NODE_ENV === Environment.Development) {
      this.app.use(RequestLogger());
    }
    this.app.use(requestValidationHandler);
    this.app.use(errorHandler);
  }

  public listen() {
    const numCPUs = cpus().length;

    if (cluster.isMaster) {
      console.log(`Primary ${process.pid} is running`);

      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, _code, _signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      this.app.listen(this.port, () => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Server is listening at port', this.port);
          console.log(`Worker ${process.pid} started`);
        }
      });
    }
  }
}

export default App;
