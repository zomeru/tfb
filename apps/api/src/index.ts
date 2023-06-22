import { createServer } from './server';

export const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT ?? 8000;
const server = createServer();

server.listen(port, () => {
  if (isProd) console.log('Server started');
  else console.log(`Server started at http://localhost:${port}`);
});
