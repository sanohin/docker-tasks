const Koa = require('koa');
const { MongoClient } = require('mongodb');
const template = require('./template');

(async () => {
  const connection = await MongoClient.connect('mongodb://mongo:27017');
  const mongo = connection.db('app');

  const requests = mongo.collection('requests');
  const app = new Koa();
  app.use(async ctx => {
    const date = new Date();
    const { ip } = ctx.request;
    await requests.insertOne({ ip, date });
    const items = await requests
      .find({})
      .sort({ date: -1 })
      .limit(50)
      .toArray();
    ctx.body = template(items);
  });
  app.listen(3000);
})();


