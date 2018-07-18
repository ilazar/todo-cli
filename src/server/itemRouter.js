import Router from 'koa-router';
import { ItemStore } from './ItemStore';

const itemStore = new ItemStore();

const router = new Router();

router.get('/', async (ctx) => { // search
  const response = ctx.response;
  response.body = await itemStore.find({});
  response.status = 200; // ok
});

router.get('/:id', async (ctx) => { // read
  const item = await itemStore.find({ id: ctx.params.id });
  if (item) {
    ctx.response.body = item;
    ctx.response.status = 200; // ok
  } else {
    ctx.response.body = { issues: [{ severity: 'info', description: 'Item not found' }] };
    ctx.response.status = 404; // not found
  }
});

router.post('/', async (ctx) => { // create
  ctx.response.body = await itemStore.insert(ctx.request.body);
  ctx.response.status = 201; // created
});

router.put('/:id', async (ctx) => { // update
  const item = ctx.request.body;
  const id = ctx.params.id;
  const response = ctx.response;
  if (item.id !== id) {
    response.body = { issues: [{ severity: 'error', description: 'Param id and body id should be the same' }] };
    response.status = 400; // bad request
    return;
  }
  const updatedCount = await itemStore.update({ id }, item);
  if (updatedCount === 1) {
    response.body = item;
    response.status = 200; // ok
  } else {
    response.body = { issues: [{ severity: 'error', description: 'Resource no longer exists' }] };
    response.status = 405; // method not allowed
  }
});

router.del('/:id', async (ctx) => { // delete
  const id = ctx.params.id;
  const count = await itemStore.remove({ id });
  ctx.response.body = {};
  ctx.response.status = 204; // no content
});

export default router;