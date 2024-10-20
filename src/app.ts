import express from 'express';
import 'express-async-errors';

import clientRouter from './routes/client.routes';
import propertyRouter from './routes/property.routes';
import dealRouter from './routes/deal.routes';
import errorMiddleware from './middlewares/error.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.get('/', async (_req, res) => {
      res.json({ message: 'GET route working as expected!' });
    });

    this.app.use(clientRouter);
    this.app.use(propertyRouter);
    this.app.use(dealRouter);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}!`);
    });
  }
}

export default new App();
