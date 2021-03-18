const vscode = require('vscode');
const path = require("path");

/**
 * 提示
 * @param {*} Text
 */
function Tips(Text) {
	Text && vscode.window.showInformationMessage(Text);
}


/**
 * 获取工作目录空间
 *
 * @param {*} document
 * @return {*} 
 */
function GetWorkspace(document) {
	const fileName = document.fsPath;//文件路径
	var workspace = null;
	vscode.workspace.workspaceFolders.map((item) => {
		var fsPath = item.uri.fsPath;//'e:\xiangheng\web\vscode\test'

		if (fileName.indexOf(fsPath) == 0) {
			workspace = item;
		}
		console.log("fsPath", fsPath);
	})
	// workspace.uri.fsPath 项目路径
	return workspace

	// if (workspace) {
	// cli.readConfig(workspace.uri.fsPath)
	// } else {
	// console.log('未获取到工作空间');
	// }
}


var HBuilderConfig = vscode.workspace.getConfiguration('HBuilder');
var HBuilderDir = "";
var HBuilderCli = "";
/**
 *获取 HBuilder的Cli路径
 *
 * @return {string} HBuilderCli
 */
function GetHBuilderCli() {

	if (HBuilderConfig.get("dir")) {
		HBuilderDir = HBuilderConfig.get("dir");
	} else if (process.env.HBuilder) {
		HBuilderDir = process.env.HBuilder;
	} else {
		HBuilderDir = ""

	}
	HBuilderCli = path.join(HBuilderDir, "cli");
	console.log("HBuilderDir完整路径: ", HBuilderCli);


	if (HBuilderCli == 'cli') {
		vscode.window.showInformationMessage('需要设置 HBuilder.dir为HBuilder的安装路径');
		return null
	} else {
		return HBuilderCli
	}

}
module.exports = {
	Tips,
	GetWorkspace,
	GetHBuilderCli,
	HBuilderConfig,
}