const vscode = require('vscode');
const util = require('./util.js');
const cli = require('./cli.js');




// opc.clear(); // 清空
// opc.appendLine('水电费'); // 追加一行
// opc.show();


function OpenHBuilder(document) {
	var workspace = util.GetWorkspace(document);
	if (!workspace) {
		util.Tips("未获取到工作空间")
		return
	}

	cli.readConfig(workspace.uri.fsPath, function (config) {
		console.log(config);
		cli.openHBuilder(workspace.uri.fsPath)
	})

}

function buildApp(document) {
	var workspace = util.GetWorkspace(document);//获取工作目录
	if (!workspace) {
		util.Tips("未获取到工作空间")
		return
	}
	util.Output.clear(); // 清空
	util.Output.show();

	cli.readConfig(workspace.uri.fsPath, function () {
		cli.openHBuilder(workspace.uri.fsPath, function () {
			cli.buildApp(workspace.uri.fsPath, function (code, data) {
				// code==-1 自定义错误code,-2是正常数据,-3是错误数据, 其他是进程code
				// console.log(code, data);

				if (code == -1 && data) {//自定义异常
					util.Tips(data)
				} else if (code == -2 && data) {//进程正常返回数据
					// 制作结果：Succeed.    安装包位置：E:/icpc_workspace_2/shougang/APP/zdhlAliyunApp/unpackage/release/apk/H5E14EBC2_20210319133334.apk
					util.Output.appendLine(data); // 追加一行
				} else if (code == -3 && data) {//进程异常返回数据
					util.Output.appendLine(data); // 追加一行
				}
			})
		})
	})
}



module.exports = {
	OpenHBuilder,
	buildApp,

}