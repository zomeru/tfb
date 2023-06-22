import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { rateLimit } from 'express-rate-limit';

export const createServer = (): Express => {
  const app = express();

  const corsOptions = {
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  };

  const proxyOptions = {
    target: process.env.CLIENT_URL,
    changeOrigin: true,
  };

  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 500,
    message: 'Too many requests from this IP, please try again in an hour!',
  });

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(express.json())
    .use(cors(corsOptions))
    .use(helmet())
    // TODO - routes goes here
    .use('/', createProxyMiddleware(proxyOptions))
    .use(limiter)
    .get('/healthz', (_, res) => {
      res.status(200).send({ status: 'OK' });
    });

  return app;
};
