# kenote-react-desktop-app

基于 `Electron` 和 `React` 的桌面应用模版，并用 `Anu.js` 框架方案替换官方的 `React` 框架。

### 架构

- Webpack 4.x.x
- Electron 2.x.x
- Anu.js 1.4.x

### 安装

系统 `Node.js` 版本不低于 `v8.0.0`

```bash
git clone https://github.com/thondery/kenote-react-desktop-app.git desktop-app
cd desktop-app && yarn install
```

### 使用

```bash
# 编译公共库 dll
yarn compile:dll

# web 调试
yarn debug:dev

# 打包 web
yarn compile:prod

# 编译桌面主进程
yarn compile:main

# 编译桌面渲染层
yarn compile:renderer

# 运行桌面应用
yarn electron:dev

# 打包桌面应用，platform = mac|mas|win32|win64|linux
yarn packager:app <platform>

# 打压缩包，platform = mac|mas|win32|win64|linux
yarn packager:zip <platform>

# 打包 dmg 安装包
yarn packager:dmg
```