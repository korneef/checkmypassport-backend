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

  await axios.get(
    `https://info.midpass.ru/api/request/${ctx.params.uid}`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
      }
    })
    .then(data => ctx.response.body = data.data)
    .catch(error => {
      console.log(error);
    })
});

app.use(koaBody({
  urlencoded: true,
}));
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
server.listen(port);
