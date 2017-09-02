const router = require('./src/router').router
const serverPort = require('config').get('server').get('port')

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const koaBody = require("koa-body");

const staticServer = require('koa-static')
const path = require('path')
const fs = require('fs')

const app = new Koa();

app.use(logger());
app.use(koaBody({ multipart: true }));

app.use(bodyParser());
app.use(router.routes());
app.use(staticServer(path.join(__dirname, "public")))

const server = app.listen(serverPort)
console.log(`app started at port ${serverPort}...`);

const staticFolder = path.join(__dirname, 'public')
const photoFolder = path.join(__dirname, 'public', 'photo')
const avatarFolder = path.join(__dirname, 'public', 'avatar')
if (!fs.existsSync(staticFolder)) {
    fs.mkdirSync(staticFolder);
}
if (!fs.existsSync(avatarFolder)) {
    fs.mkdirSync(avatarFolder);
}
if (!fs.existsSync(photoFolder)) {
    fs.mkdirSync(photoFolder);
}

module.exports = {
    server
}