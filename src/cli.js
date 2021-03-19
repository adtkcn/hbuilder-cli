const path = require("path");

const fs = require("fs");

const cp = require("child_process");
const JSON5 = require("json5");
var iconv = require('iconv-lite');

const util = require('./util.js');

var config = null;


/**
 * @callback CallbackHandler
 * @param {number} code -1 自定义错误code,-2是正常数据,-3是错误数据, 其他是进程code
 * @param {string} [data] - 数据
 */

/**
 * 读取工作目录配置文件
 * @param {*} rootPath 工作根目录
 * @param { CallbackHandler } callback
 */
function readConfig(rootPath, callback) {
  var HBuilderConfig = path.join(rootPath, "HBuilderConfig.json");

  fs.readFile(HBuilderConfig, function (err, data) {
    if (err) {
      util.Tips("读取配置文件错误,检查是否存在HBuilderConfig.json")
      return console.log("读取配置文件错误", err);
    }
    var d = String(data);
    config = JSON5.parse(d);
    console.log("config", config);

    callback && callback(config);

  });
}


/**
 * 读取工作目录配置文件
 * @param {*} rootPath 工作根目录
 * @param { CallbackHandler } [callback]
 */
function openHBuilder(rootPath, callback) {
  var HBuilderCli = util.GetHBuilderCli()
  if (!HBuilderCli) {
    callback && callback(-1);
    return
  }

  var ls = cp.spawn(HBuilderCli, ["open"], {});
  ls.on("exit", function (code) {
    console.log("openHBuilder code " + code);
    if (code === 0) {
      setTimeout(() => {
        AddProject(rootPath, callback);
      }, 10);
    } else {
      callback && callback(code);
    }
  });
}



/**
 * 添加项目到HBuilder工具
 * @param {*} rootPath
 * @param { CallbackHandler } callback
 */
function AddProject(rootPath, callback) {
  var HBuilderCli = util.GetHBuilderCli()
  if (!HBuilderCli) {
    callback && callback(-1);
    return
  }
  var open = cp.exec(
    HBuilderCli + " project open --path " + rootPath
  );
  open.on("exit", function (code) {
    console.log("AddProject code " + code);
    callback && callback(code);
  });
}

/**
 *打包app
 *
 * @param {*} rootPath
 * @param { CallbackHandler } callback
 */
function buildApp(rootPath, callback) {
  var HBuilderCli = util.GetHBuilderCli()
  if (!HBuilderCli) {
    callback && callback(-1);
    return
  }
  var HBuilderConfig = path.join(rootPath, "HBuilderConfig.json");

  // D:\办公\HBuilderX\cli pack --config e:\icpc_workspace_2\shougang\APP\zdhlAliyunApp\HBuilderConfig.json  


  console.log(HBuilderCli, ["pack", "--config", HBuilderConfig]);

  var pack = cp.spawn(
    HBuilderCli, ["pack", "--config", HBuilderConfig]
  );
  pack.stdout.on('data', (data) => {
    var str = iconv.decode(Buffer.from(data, "binary"), "GBK")

    // console.log(`stdout: ${str}`);
    callback && callback(-2, str);
  });

  pack.stderr.on('data', (data) => {

    var str = iconv.decode(Buffer.from(data, "binary"), "GBK")
    callback && callback(-3, str);
    // console.error(`stderr: ${str}`);
  });

  pack.on("exit", function (code) {
    console.log("buildApp code " + code);
    callback && callback(code);
  });

}

module.exports = {
  readConfig,
  openHBuilder,
  AddProject,

  buildApp,
}