
const util = require("./util.js");
const cli = require("./cli.js");
const cp = require("child_process");

const pluginConfig = require("./config");


function OpenHBuilder(document) {
  return new Promise(async (resolve, reject) => {
    var workspace = util.GetWorkspace(document);
    if (!workspace) {
      util.Tips("未获取到工作空间");
      return;
    }
    try {
      var HBuilderConfig = await cli.readConfig(workspace.uri.fsPath)
      await cli.openHBuilder(workspace.uri.fsPath);

      resolve({ HBuilderConfig, workspace })
    } catch (error) {
      console.log("error", error);
      reject(error)
    }
  })
}

// 正式安卓
function buildAndroidApp(document) {
  buildApp(document, { platform: "android", iscustom: false })
}
// 自定义安卓基座
function buildCustomAndroidApp(document) {
  buildApp(document, { platform: "android", iscustom: true })
}
// 正式ios
function buildIOSApp(document) {
  buildApp(document, { platform: "ios", iscustom: false })
}
// 自定义ios基座
function buildCustomIOSApp(document) {
  buildApp(document, { platform: "ios", iscustom: true })
}


async function buildApp(document, info = {}) {

  util.Output.clear(); // 清空
  util.Output.show();
  try {
    var { HBuilderConfig, workspace } = await OpenHBuilder(document);

    var HBuilderConfigFileTemp = await cli.MergeConfig(workspace.uri.fsPath, HBuilderConfig, info);

    cli.buildApp(workspace.uri.fsPath, HBuilderConfigFileTemp, function (code, data) {
      // code==-1 自定义错误code,-2是正常数据,-3是错误数据, 其他是进程code

      if (code == -1 && data) {
        //自定义异常
        util.Tips(data);
      } else if (code == -2 && data) {
        //进程正常返回数据
        // 制作结果：Succeed.    安装包位置：E:/icpc/shougang/APP/zdhlAliyunApp/unpackage/release/apk/H5E14EBC2_20210208200428.apk
        util.Output.appendLine(data); // 追加一行

        if (
          data.indexOf("打包成功") != -1 &&
          data.indexOf("安装包位置：") != -1
        ) {
          var appPath = data.split("安装包位置：")[1];

          if (!appPath) {
            util.Output.appendLine("打包的路径获取出错"); // 输出日志
            return;
          }
          var newAppPath = appPath.replace(/\//g, "\\").replace(/\n/g, "").replace(/(\s*$)/g, "");

          // if (process.platform == "win32") {
          //   cp.exec("explorer.exe /select," + newAppPath);
          // }

          var link = encodeURIComponent(newAppPath);
          util.openDefaultBrowser(
            `http://${util.getLocalIP()}:${pluginConfig.port}?link=${link}`
          );
        }
      } else if (code == -3 && data) {
        //进程异常返回数据
        util.Output.appendLine(data); // 追加一行
      }
    });

  } catch (error) {
    console.log("error", error);
  }









}

module.exports = {
  OpenHBuilder,
  buildApp,
  buildAndroidApp,
  buildCustomAndroidApp,
  buildIOSApp,
  buildCustomIOSApp
};
