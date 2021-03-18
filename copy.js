//模块“vscode”包含VS代码扩展性API
//导入模块并使用下面代码中的别名vscode引用它
const vscode = require('vscode');
const path = require('path');

// function commentLine() {
// 	vscode.commands.executeCommand('editor.action.addCommentLine');
// }

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
		const panel = vscode.window.createWebviewPanel(
			'catCoding', // 只供内部使用，这个webview的标识
			'Cat Coding', // 给用户显示的面板标题
			vscode.ViewColumn.One, // 给新的webview面板一个编辑器视图
			{
				// 在webview中启用脚本
				enableScripts: true
			} // Webview选项。我们稍后会用上
		);
		// 获取磁盘上的资源路径
		const onDiskPath = vscode.Uri.file(
			path.join(context.extensionPath, 'webview', 'Floyd0122_01j7g3.png')
		);

		// 获取在webview中使用的特殊URI
		const catGifSrc = onDiskPath.with({ scheme: 'vscode-resource' });
		console.log(catGifSrc);
		panel.webview.html = getWebviewContent(catGifSrc);

		// 向用户显示消息框
		vscode.window.showInformationMessage('Hello World from xh-vscodedemo!');
	});
	console.log(context);
	context.subscriptions.push(disposable);
}

// 停用扩展时将调用此方法
function deactivate() {
	console.log('干嘛停用我');
}

function getWebviewContent(catGifSrc) {
	return `
	<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>

<body>
	helloWorld ${catGifSrc}
	<img src="${catGifSrc}"/>

</body>

</html>
	`
}
module.exports = {
	activate,
	deactivate
}
