const serve = require('koa-static');
const Router = require('koa-router');
const Koa = require('koa');
const fs = require('fs');
const { resolve } = require('path')


const app = new Koa();
const router = new Router(); // 创建路由，支持传递参数

const util = require('./util.js');

// $ GET /package.json

router.get('/open', async (ctx) => {
	// var query = {
	// 	link: ctx.query.link
	// }
	util.openDefaultBrowser(`http://${util.getLocalIP()}:3000?link=${ctx.query.link}`)
})
router.get('/download', async (ctx) => {

	try {
		var file = fs.readFileSync(resolve(ctx.query.filePath), 'binary')
		console.log(file.);
		var filename = 'app.apk'
		ctx.set('Content-disposition', 'attachment;filename=' + filename)
		ctx.body = file
	} catch (error) {
		console.log(error);
	}
})

router.get('/stop', async (ctx) => {
	process.exit(0);
})
app.use(serve(__dirname));



// app.use(serve("E:/icpc_workspace_2/shougang/APP/zdhlAliyunApp/unpackage/release/apk/"));

app.use(router.routes());
app.use(router.allowedMethods({
	// throw: true, // 抛出错误，代替设置响应头状态
	// notImplemented: () => '不支持当前请求所需要的功能',
	// methodNotAllowed: () => '不支持的请求方式'
}));

app.listen(3000);




console.log('listening on port 3000');