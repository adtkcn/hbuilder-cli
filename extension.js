//模块“vscode”包含VS代码扩展性API
//导入模块并使用下面代码中的别名vscode引用它
const vscode = require("vscode");
// const path = require('path');
// const fs = require('fs');

const commands = require("./src/commands.js");

const server = require("./src/server/server.js");

/**
 * @param {vscode.ExtensionContext} context
 * 当扩展激活时，将调用此方法
 * 您的扩展在第一次执行命令时被激活
 */
function activate(context) {
  console.log("hbuilder-cli: 我被激活了,我准备干大事了!");

  server.init();

  // 命令在package.json文件中定义, 用registerCommand注册
  // commandId参数必须与package.json中的command字段匹配
  let disposableOpenHBuilder = vscode.commands.registerCommand(
    "hbuilder-cli.openHBuilder",
    commands.OpenHBuilder
  );

  let disposableBuildApp = vscode.commands.registerCommand(
    "hbuilder-cli.buildApp",
    commands.buildApp
  );

  // vscode.languages.registerHoverProvider(
  // 	{ scheme: 'file', language: 'html' },
  // 	{
  // 		provideHover(document, position, token) {
  // 			const fileName = document.fileName;
  // 			// const fileDir = path.dirname(fileName);
  // 			// const word = document.getText(document.getWordRangeAtPosition(position));

  // 			// console.log("TextDocument", document);
  // 			// console.log("uri", document.uri);
  // 			// console.log("getText", word);//word可能是全文
  // 			// console.log(position, token);
  // 			console.log("fileName", fileName);

  // 			const { size } = fs.statSync(document.uri.fsPath);
  // 			return new vscode.Hover(`恒哥告诉你本文件长度 ${size}`);
  // 		}
  // 	}
  // );

  console.log("activate context", context);
  context.subscriptions.push(disposableOpenHBuilder);
  context.subscriptions.push(disposableBuildApp);
}

// 停用扩展时将调用此方法
function deactivate() {
  server.exit();
  console.log("HbuilderCli： 干嘛停用我,不高兴了哦");
}

module.exports = {
  activate,
  deactivate,
};
