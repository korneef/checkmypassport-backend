const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const app = new Koa();
const Router = require('koa-router');
const axios = require('axios')

const router = new Router();

const server = http.createServer(app.callback());

router.get('/:uid([0-9]{25})', async (ctx) => {
  const midResponse = await axios.get(`https://info.midpass.ru/api/request/${ctx.params.uid}`);
  const midData = await midResponse.data;
  if (midResponse.headers.hasOwnProperty('content-type')) {
    ctx.response.body = await midData
  } 
});

app.use(koaBody({
  urlencoded: true,
}));
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
server.listen(port);
