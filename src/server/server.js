const serve = require("koa-static");
const Router = require("koa-router");
const Koa = require("koa");
const fs = require("fs");
const path = require("path");

const app = new Koa();
const router = new Router(); // 创建路由，支持传递参数

const config = require("../config");

router.get("/download", async (ctx) => {
  try {
    // var file = fs.readFileSync(resolve(ctx.query.link), "binary");
    if (!ctx.query.link) {
      ctx.body = "没有文件路径link参数";
      return;
    }
    var link = decodeURIComponent(ctx.query.link);

    var filePath = path.resolve(link);

    var basename = path.basename(filePath);
    console.log(basename); //文件名.扩展名
    var extname = path.extname(filePath); //扩展名
    console.log(extname);

    var file = fs.readFileSync(filePath);

    // var filename = "app.apk";
    ctx.set("Content-disposition", "attachment;filename=" + basename);
    ctx.body = file;
  } catch (error) {
    console.log(error);
  }
});

// 静态文件
app.use(serve(__dirname));

app.use(router.routes());
app.use(router.allowedMethods());

exports.init = function () {
  app.listen(config.port);
  console.log("listening on port " + config.port);
};
exports.exit = function () {
  process.exit(0);
};
