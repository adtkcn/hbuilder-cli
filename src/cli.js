const path = require("path");

const fs = require("fs");

const cp = require("child_process");
const JSON5 = require("json5");
var iconv = require('iconv-lite');

const util = require('./util.js');

var config = null;

/**
 * 读取工作目录配置文件
 * @param {*} rootPath 工作根目录
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
 * 检查config是否完整
 * @param {string} platform all,android,ios
 * @return {boolean} 
 */
function CheckConfig(platform = 'all') {
  var flag = false;
  if (platform == 'all') {
    flag = CheckAndroidConfig() && CheckIosConfig()
  } else if (platform == 'android') {
    flag = CheckAndroidConfig()
  } else if (platform == 'ios') {
    flag = CheckIosConfig()
  }
  return flag
}

function CheckAndroidConfig() {
  return false
}
function CheckIosConfig() {
  return false
}


function openHBuilder(rootPath) {
  var HBuilderCli = util.GetHBuilderCli()
  if (!HBuilderCli) {
    return
  }

  var ls = cp.spawn(HBuilderCli, ["open"], {});
  ls.on("exit", function (code) {
    console.log("openHBuilder code " + code);
    if (code === 0) {
      setTimeout(() => {
        openProject(rootPath);
      }, 10);
    }
  });
}

function openProject(rootPath) {
  // var newRootPath = rootPath.replace(/\\/g, "/");
  var HBuilderCli = util.GetHBuilderCli()
  if (!HBuilderCli) {
    return
  }
  var open = cp.exec(
    HBuilderCli + " project open --path " + rootPath
  );
  open.on("exit", function (code) {
    console.log("openProject code " + code);
  });
}


function buildApp(rootPath) {
  var HBuilderCli = util.GetHBuilderCli()
  if (!HBuilderCli) {
    return
  }
  var HBuilderConfig = path.join(rootPath, "HBuilderConfig.json");

  // D:\办公\HBuilderX\cli pack --config e:\icpc_workspace_2\shougang\APP\zdhlAliyunApp\HBuilderConfig.json  

  // console.log("buildApp HBuilderConfig", HBuilderConfig);

  console.log(HBuilderCli, ["pack", "--config", HBuilderConfig]);

  var pack = cp.spawn(
    HBuilderCli, ["pack", "--config", HBuilderConfig]
  );
  pack.stdout.on('data', (data) => {
    var str = iconv.decode(Buffer.from(data, "binary"), "GBK")

    console.log(`stdout: ${str}`);
  });

  pack.stderr.on('data', (data) => {

    var str = iconv.decode(Buffer.from(data, "binary"), "GBK")
    console.error(`stderr: ${str}`);
  });

  pack.on("exit", function (code) {
    console.log("buildApp code " + code);
  });

}

module.exports = {
  readConfig,
  openHBuilder,
  openProject,

  buildApp,
  CheckConfig
}