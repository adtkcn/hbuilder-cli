const util = require('./util.js');
const cli = require('./cli.js');


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
	cli.readConfig(workspace.uri.fsPath, function () {
		cli.buildApp(workspace.uri.fsPath)
	})
}



module.exports = {
	OpenHBuilder,
	buildApp,

}