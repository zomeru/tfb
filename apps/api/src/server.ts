import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { startStandaloneServer } from '@apollo/server/standalone';
import { rateLimit } from 'express-rate-limit';

import { typeDefs, resolvers } from '@/graphql';

export const isProd = process.env['NODE_ENV'] === 'production';

export const createServer = async () => {
  const app = express();

  const clientURL = process.env['CLIENT_URL'];

  const corsOptions = {
    origin: clientURL,
    optionsSuccessStatus: 200,
    credentials: true
  };

  const proxyOptions = {
    target: clientURL,
    changeOrigin: true
  };

  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 500,
    message: 'Too many requests from this IP, please try again in an hour!'
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

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: []
  });

  const port = Number(process.env['PORT']) || 8000;

  const { url } = await startStandaloneServer(server, {
    listen: { port }
  });

  app.use('/', expressMiddleware(server));

  console.log(`Server started ${url}`);
};
