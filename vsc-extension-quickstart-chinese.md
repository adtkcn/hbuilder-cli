文件夹里有什么

此文件夹包含扩展名所需的所有文件。

`package.json`-这是声明扩展名和命令的清单文件。

示例插件注册命令并定义其标题和命令名。有了这些信息，VS 代码可以在命令调色板中显示命令。它还不需要加载插件。

`extension.js`-这是主文件，您将在其中提供命令的实现。

该文件导出一个函数 activate，它在扩展名第一次被激活时被调用（在本例中是通过执行命令）。在 activate 函数中，我们称之为 registerCommand。

我们将包含命令实现的函数作为第二个参数传递给 registerCommand。

站起来马上就跑

按 F5 打开一个新窗口并加载扩展名。

通过按（在 Mac 上按 Ctrl+Shift+P 或 Cmd+Shift+P）并键入 Hello World，从命令调色板运行命令。

在代码中设置断点扩展.js 调试扩展。

在调试控制台中查找扩展的输出。

进行更改

在中更改代码后，可以从调试工具栏重新启动扩展扩展.js.

您还可以使用扩展名重新加载 VS 代码窗口（在 Mac 上为 Ctrl+R 或 Cmd+R）以加载更改。

探索 API

当您打开文件节点\u modules/@types/vscode/index.d.ts 时，您可以打开我们的整套 API。

运行测试

打开 debug viewlet（在 Mac 上为 Ctrl+Shift+D 或 Cmd+Shift+D），然后从 launch configuration 下拉列表中选择 Extension Tests。

按 F5 在加载扩展的新窗口中运行测试。

在调试控制台中查看测试结果的输出。

对 src/test/suite 进行更改/扩展.test.js 或者在 test/suite 文件夹中创建新的测试文件。

提供的测试运行程序将只考虑与名称模式\*\*匹配的文件。测试.ts.

您可以在 test 文件夹中创建文件夹，以任何方式构造测试。
