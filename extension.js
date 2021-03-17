//模块“vscode”包含VS代码扩展性API
//导入模块并使用下面代码中的别名vscode引用它
const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 * 当扩展激活时，将调用此方法
 * 您的扩展在第一次执行命令时被激活
 */
function activate(context) {


	console.log('Congratulations, your extension "xh-vscodedemo" is now active!');

	// 命令已在package.json文件中定义
	// 现在用registerCommand提供命令的实现
	// commandId参数必须与package.json中的command字段匹配 
	let disposable = vscode.commands.registerCommand('xh-vscodedemo.helloWorld', function () {
		// 每次执行命令时，您将执行您在此处放置的代码

		// 向用户显示消息框

		vscode.window.showInformationMessage('Hello World from xh-vscodedemo!');



	});
	console.log(context);
	context.subscriptions.push(disposable);
}

// 停用扩展时将调用此方法
function deactivate() {
	console.log('干嘛停用我');
	vscode.window.showInformationMessage('干嘛停用我!!!');
}

module.exports = {
	activate,
	deactivate
}
