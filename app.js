const router = require('./src/router').router

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');

