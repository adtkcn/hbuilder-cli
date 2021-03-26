# hbuilder-cli

# -----首先请注意-----

在项目的 `manifest.json` 文件加入如下配置, 避免配置文件打包进 App

```
"unpackage":["HBuilderConfig.json"]

```

# 功能

1. 打开 HBuilder,并将项目添加到 HBuilder
2. 打包 安卓 和 ios 正式和自定义 app
3. 打包完成后自动打开浏览器显示二维码，方便安装到手机
4. window 系统在安装完成后自动打开 app 所在目录

# 插件需求

1. HBuilder 版本需要 `3.1.5` 以上,

2. 在 vscode 设置 HBuilder 的安装目录(优先级高), 或者将目录加入系统环境变量,环境变量名称为 HBuilder

```js
"HBuilder.dir": "D:/办公/HBuilderX",
```

3. 需要项目根目录创建一个名为 `HBuilderConfig.json` 的配置文件, 内容如下
https://hx.dcloud.net.cn/cli/pack?id=%e6%89%93%e5%8c%85%e9%85%8d%e7%bd%ae%e6%96%87%e4%bb%b6
```js
{
  //项目名字或项目绝对路径
  "project": "和目录名保持一致",
  //打包平台 默认值android  值有"android","ios" 如果要打多个逗号隔开打包平台
  "platform": "android,ios",
  //是否使用自定义基座 默认值false  true自定义基座 false自定义证书
  "iscustom": false,
  //打包方式是否为安心打包默认值false,true安心打包,false传统打包
  "safemode": true,
  //android打包参数
  "android": {
    //安卓包名
    "packagename": "plus.11111111111",
    //安卓打包类型 默认值0 0 使用自有证书 1 使用公共证书 2 使用老版证书
    "androidpacktype": "0",
    //安卓使用自有证书自有打包证书参数
    //安卓打包证书别名,自有证书打包填写的参数
    "certalias": "zdhlapp",
    //安卓打包证书文件路径,自有证书打包填写的参数,  -------------相对路径(官方本身配置需要绝对路径,我考虑到切换电脑不方便,改为相对路径)-----
    "certfile": "../zdhlapp.keystore",
    //安卓打包证书密码,自有证书打包填写的参数
    "certpassword": "",
    //安卓平台要打的渠道包 取值有"google","yyb","360","huawei","xiaomi","oppo","vivo"，如果要打多个逗号隔开
    "channels": ""
  },
  //ios打包参数
  "ios": {
    //ios appid
    "bundle": "plus.11111111111",
    //ios打包支持的设备类型 默认值iPhone 值有"iPhone","iPad" 如果要打多个逗号隔开打包平台
    "supporteddevice": "iPhone,iPad",
    //iOS打包是否打越狱包,只有值为true时打越狱包,false打正式包
    "isprisonbreak": false,
    //iOS使用自定义证书打包的profile文件路径
    "profile": "../ios.mobileprovision",//-------------相对路径(官方本身配置需要绝对路径,我考虑到切换电脑不方便,改为相对路径)-----
    //iOS使用自定义证书打包的p12文件路径
    "certfile": "../ios.p12",//-------------相对路径(官方本身配置需要绝对路径,我考虑到切换电脑不方便,改为相对路径)-----
    //iOS使用自定义证书打包的证书密码
    "certpassword": ""
  },
  //是否混淆 true混淆 false关闭
  "isconfusion": false,
  //开屏广告 true打开 false关闭
  "splashads": false,
  //悬浮红包广告true打开 false关闭
  "rpads": false,
  //push广告 true打开 false关闭
  "pushads": false,
  //加入换量联盟 true加入 false不加入
  "exchange": false
}

```

# 其他

> 仓库地址

```
git@github.com:adtkcn/hbuilder-cli.git
```

> 原理: 是对 hbuilder/cli.exe 的封装
