const vscode = require("vscode");
const path = require("path");

const Output = vscode.window.createOutputChannel("HBuilderCli"); // 可以有多个OutputChannel共存，使用参数名区分

/**
 * 提示
 * @param {*} Text
 */
function Tips(Text) {
  Text && vscode.window.showInformationMessage(Text);
  Text && Output.appendLine(Text);
}

/**
 * 获取工作目录空间
 *
 * @param {*} document
 * @return {*}
 */
function GetWorkspace(document) {
  const fileName = document.fsPath; //文件路径
  var workspace = null;
  vscode.workspace.workspaceFolders.map((item) => {
    var fsPath = item.uri.fsPath; //'e:\xiangheng\web\vscode\test'

    if (fileName.indexOf(fsPath) == 0) {
      workspace = item;
    }
    console.log("fsPath", fsPath);
  });
  // workspace.uri.fsPath 项目路径
  return workspace;

  // if (workspace) {
  // cli.readConfig(workspace.uri.fsPath)
  // } else {
  // console.log('未获取到工作空间');
  // }
}

var HBuilderConfig = vscode.workspace.getConfiguration("HBuilder");
var HBuilderDir = "";
var HBuilderCli = "";
/**
 *获取 HBuilder的Cli路径
 *
 * @return {string} HBuilderCli
 */
function GetHBuilderCli() {
  HBuilderConfig = vscode.workspace.getConfiguration("HBuilder");
  if (HBuilderConfig.get("dir")) {
    HBuilderDir = HBuilderConfig.get("dir");
  } else if (process.env.HBuilder) {
    HBuilderDir = process.env.HBuilder;
  } else {
    HBuilderDir = "";
  }
  HBuilderCli = path.join(HBuilderDir, "cli");
  console.log("HBuilderDir完整路径: ", HBuilderCli);
  if (HBuilderCli == "cli") {
    Tips("需要在vscode设置 HBuilder.dir为HBuilder的安装路径");
    return null;
  } else {
    return HBuilderCli;
  }
}

/**
 * 获取本机ip
 *
 * @return {*}
 */
function getLocalIP() {
  const os = require("os");
  const osType = os.type(); //系统类型
  const netInfo = os.networkInterfaces(); //网络信息
  let ip = "";

  console.log(osType, netInfo);

  if (osType === "Windows_NT") {
    for (let dev in netInfo) {
      console.log(dev);
      //win7的网络信息中显示为本地连接，win10显示为以太网
      if (dev === "本地连接" || dev === "以太网" || dev == "WLAN") {
        for (let j = 0; j < netInfo[dev].length; j++) {
          if (netInfo[dev][j].family === "IPv4") {
            ip = netInfo[dev][j].address;
            break;
          }
        }
      }
    }
  } else if (osType === "Linux") {
    ip = netInfo.eth0[0].address;
  }

  return ip;
}

/**
 *打开默认浏览器
 * @param {any} url
 */
const openDefaultBrowser = function (url) {
  var exec = require("child_process").exec;
  console.log(process.platform);
  switch (process.platform) {
    case "darwin":
      exec("open " + url);
      break;
    case "win32":
      exec("start " + url);
      break;
    default:
      exec("xdg-open", [url]);
  }
};

module.exports = {
  Tips,
  GetWorkspace,
  GetHBuilderCli,
  HBuilderConfig,
  Output,
  getLocalIP,
  openDefaultBrowser,
};
