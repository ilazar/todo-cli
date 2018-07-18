import http from 'http';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import itemRouter from './itemRouter';
import { initWss } from './itemWss';

const app = new Koa();
const server = http.createServer(app.callback());
initWss(server);

const exceptionHandler = async (ctx, next) => {
  try {
    return await next();
  } catch (err) {
    console.error(err);
    if (err.issues) {
      ctx.response.body = { issues: err.issues };
      ctx.response.status = 400; // bad request
    } else {
      ctx.response.body = { issues: [{ severity: 'error', description: 'Unexpected error' }] };
      ctx.response.status = err.status || 500;
    }
  }
};

const timingLogger = async (ctx, next) => {
  const start = Date.now();
  await next();
  console.log(`server - ${ctx.method} ${ctx.url} => ${ctx.response.status}, ${Date.now() - start}ms`);
};

app.use(exceptionHandler);
app.use(timingLogger);
app.use(bodyParser());

const prefix = '/api';

const apiRouter = new Router({ prefix });
apiRouter.use('/item', itemRouter.routes());
app
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods());

console.log('server - listening on port', 3000);
server.listen(3000);