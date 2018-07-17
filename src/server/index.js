const Koa = require('koa');
const app = new Koa();

const exceptionHandler = async (ctx, next) => {
  try {
    return await next();
  } catch (err) {
    ctx.body = { message: err.message || 'Unexpected error.' };
    ctx.status = err.status || 500;
  }
};

const timingLogger = async (ctx, next) => {
  const start = Date.now();
  await next();
  console.log(`server - ${ctx.method} ${ctx.url} => ${ctx.response.status}, ${Date.now() - start}ms`);
};

app.use(exceptionHandler);
app.use(timingLogger);

app.use(async ctx => {
  const name = ctx.request.query.name;
  ctx.response.body = `Hello ${name || 'World'}`;
});

console.log('server - listening on port', 3000);
app.listen(3000);