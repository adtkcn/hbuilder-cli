const path = require("path");

const fs = require("fs");
const os = require("os");
const cp = require("child_process");
const JSON5 = require("json5");
var iconv = require('iconv-lite');

const util = require('./util.js');
const pluginConfig = require("./config");


/**
 * @callback CallbackHandler
 * @param {number} code -1 自定义错误code,-2是正常数据,-3是错误数据, 其他是进程code
 * @param {string} [data] - 数据
 */


/**
 * 读取工作目录配置文件
 * @param {*} rootPath 工作根目录 
 */
function readConfig(rootPath) {
  return new Promise((resolve, reject) => {

    var HBuilderConfig = path.join(rootPath, pluginConfig.ConfigFileName);
    fs.readFile(HBuilderConfig, function (err, data) {
      if (err) {
        util.Tips("读取配置文件错误,检查是否存在" + pluginConfig.ConfigFileName)
        reject("读取配置文件错误")
        return
      }
      var d = String(data);
      try {
        var c = JSON5.parse(d);
        resolve(c)
      } catch (error) {
        reject(error)
      }
    });
  })

}


/**
 * 读取工作目录配置文件
 * @param {*} rootPath 工作根目录
 */
function openHBuilder(rootPath, callback) {
  return new Promise((resolve, reject) => {
    var HBuilderCli = util.GetHBuilderCli()
    if (!HBuilderCli) {
      reject(-1)
      return
    }

    var ls = cp.spawn(HBuilderCli, ["open"], {});
    ls.on("exit", function (code) {
      console.log("openHBuilder code " + code);
      if (code === 0) {
        setTimeout(() => {
          AddProject(rootPath, function (addCode) {
            if (addCode == -1) {
              reject(-1)
            } else {
              resolve(addCode)
            }
          });
        }, 10);
      } else {
        callback && callback(code);
        reject(code)
      }
    });
  })
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
 * @param {*} rootPath 项目路径
 * @param { string } HBuilderConfigFileTemp 临时配置文件路径
 * @param { CallbackHandler } callback
 */
function buildApp(rootPath, HBuilderConfigFileTemp, callback) {
  var HBuilderCli = util.GetHBuilderCli()
  if (!HBuilderCli) {
    callback && callback(-1);
    return
  }
  // D:\办公\HBuilderX\cli pack --config e:\icpc_workspace_2\shougang\APP\zdhlAliyunApp\HBuilderConfig.json  


  console.log(HBuilderCli, ["pack", "--config", HBuilderConfigFileTemp]);

  var pack = cp.spawn(
    HBuilderCli, ["pack", "--config", HBuilderConfigFileTemp]
  );
  pack.stdout.on('data', (data) => {
    var str = iconv.decode(Buffer.from(data, "binary"), "GBK")
    callback && callback(-2, str);
  });

  pack.stderr.on('data', (data) => {

    var str = iconv.decode(Buffer.from(data, "binary"), "GBK")
    callback && callback(-3, str);
  });

  pack.on("exit", function (code) {
    console.log("buildApp code " + code);
    callback && callback(code);
  });

}

// 合并配置文件
function MergeConfig(rootPath, HBuilderConfig = {}, info = {}) {
  return new Promise((resolve) => {

    var HBuilderConfigFileTemp = path.join(os.tmpdir(), pluginConfig.ConfigFileTemp);

    var android = Object.assign({}, HBuilderConfig.android, {
      certfile: path.join(rootPath, HBuilderConfig.android.certfile)
    })
    var ios = Object.assign({}, HBuilderConfig.ios, {
      profile: path.join(rootPath, HBuilderConfig.ios.profile),
      certfile: path.join(rootPath, HBuilderConfig.ios.certfile),
    })

    var newConfig = Object.assign({}, HBuilderConfig, {
      android: android,
      ios: ios
    }, info)
    var str = JSON.stringify(newConfig, undefined, "\t")

    util.mkdirs(path.dirname(HBuilderConfigFileTemp), function () {
      fs.writeFileSync(HBuilderConfigFileTemp, str)

      resolve(HBuilderConfigFileTemp)
    })


  })
}
module.exports = {
  readConfig,
  openHBuilder,
  AddProject,
  MergeConfig,
  buildApp,
}