import cors from 'cors';
import config from 'config';
import morgan from 'morgan';
import express, { Request, Response } from 'express';
import HttpErrorPlugin, { HttpError } from 'http-errors';

import { routes } from './routes';
import { startMongo } from './models/database';
import { ApiConfig, DatabaseConfig } from './models/interfaces';

const app = express();
app.use(morgan('short'));

// Enable CORS
app.use(cors());

// Routes
app.use(routes);

// No Route Handler
app.use((req, res, next) => next(HttpErrorPlugin(404)));

// Error Handler
app.use((err: HttpError, req: Request, res: Response) => {
  if (!err.status || err.status === 500) {
    console.error(err);
  }

  if (!res.headersSent) {
    res.status(err.status || 500).json({
      status: err.status,
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }
});


const { port } = config.get<ApiConfig>('api');
const database = config.get<DatabaseConfig>('mongodb');

startMongo(database.hostname, database.username, database.password, database.port);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
  console.log(`Usage: Open http://localhost:${port} in your browser.`);
});
