# hbuilder-cli

# 功能

1. 打开 HBuilder,并将项目添加到 HBuilder
2. 打包 安卓 和 ios app
3. 打包完成后自动打开浏览器显示二维码，方便安装到手机
4. window 系统在安装完成后自动打开 app 所在目录

# 插件需求

1. HBuilder 版本需要 `3.1.5` 以上,
2. 需要项目根目录创建一个名为 `HBuilderConfig.json` 的配置文件
3. 在 vscode 设置 HBuilder 的安装目录(优先级高), 或者将目录加入系统环境变量,环境变量名称为 HBuilder

```js
"HBuilder.dir": "D:/办公/HBuilderX",
```

### 需要在项目根目录创建一个名为 `HBuilderConfig.json` 的配置文件,内容如下

```js
{
  //项目名字或项目绝对路径
  "project": "zdhlAliyunApp",
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
    //安卓打包证书文件路径,自有证书打包填写的参数,  -------------------------绝对路径------------------
    "certfile": "E:/安卓key_证书/zdhlapp.keystore",
    //安卓打包证书密码,自有证书打包填写的参数
    "certpassword": "certpassword",
    //安卓平台要打的渠道包 取值有"google","yyb","360","huawei","xiaomi","oppo","vivo"，如果要打多个逗号隔开
    "channels": ""
  },
  //ios打包参数
  "ios": {
    //ios appid
    "bundle": "plus.H5E14EBC2",
    //ios打包支持的设备类型 默认值iPhone 值有"iPhone","iPad" 如果要打多个逗号隔开打包平台
    "supporteddevice": "iPhone,iPad",
    //iOS打包是否打越狱包,只有值为true时打越狱包,false打正式包
    "isprisonbreak": false,
    //iOS使用自定义证书打包的profile文件路径
    "profile": "E:/ios证书/阿里云版/zdhlAliyun.mobileprovision",
    //iOS使用自定义证书打包的p12文件路径
    "certfile": "E:/ios证书/阿里云版/dev_Y3ND6S8D6F_NHS23456.p12",
    //iOS使用自定义证书打包的证书密码
    "certpassword": "NHS23456"
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
