import http from 'node:http';
import { createResponseBody } from './app.js';

const port = Number.parseInt(process.env.PORT ?? '3000', 10);

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`).pathname;
  const { statusCode, contentType, body } = createResponseBody(requestUrl);

  response.writeHead(statusCode, {
    'Content-Type': contentType
  });
  response.end(body);
});

server.listen(port, () => {
  console.log(`Atlas DevOps escutando em http://localhost:${port}`);
});

export { server };