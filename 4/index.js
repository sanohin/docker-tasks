const Koa = require('koa');
const { MongoClient } = require('mongodb');
const template = require('./template');

const APP_ID = process.env.ID;
const PORT = process.env.PORT;

const isRoot = path => !path || path === '/' || path === '#';

(async () => {
  const connection = await MongoClient.connect('mongodb://mongo:27017');
  const mongo = connection.db('app');

  const requests = mongo.collection('requests');
  const app = new Koa();
  app.use(async ctx => {
    if (!isRoot(ctx.request.path)) {
      return ctx.throw(400);
    }
    const date = new Date();
    const { ip } = ctx.request;
    await requests.insertOne({ ip, date, toId: APP_ID });
    const items = await requests
      .find({})
      .sort({ date: -1 })
      .limit(50)
      .toArray();
    ctx.body = template(items);
  });
  app.listen(PORT);
})();
