
const Koa = require('koa');
const app = new Koa();

const templateEngine = require('./middleWare/template-engine');
const router = require('./middleWare/router');
const static = require('./middleWare/static');

const config = require('./config');


/*
* 这里的中间件引用顺序很重要
*
* */

// 模版引擎中间件
app.use(templateEngine(config.template));
// 路由中间件
app.use(router(config.router));
// 静态文件中间件
app.use(static(config.static));




app.use(async ctx => {
	ctx.body = ctx.state.body;
});

app.listen(config.server.port);
