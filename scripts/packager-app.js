const path = require('path')
const packager = require('electron-packager')
const { productName, version, copyright } = require('../package.json')
const electron = require('electron/package.json')
const _ = require('lodash')

const { platform } = _.zipObject([,,'platform'], process.argv)

packager({
  dir: path.resolve(__dirname, '../'),
  out: path.resolve(__dirname, '../releases'),
  name: productName,
  ignore: /^\/(node\_modules|build|dll|electron|scripts|src|.git|.babelrc|webpack|yarn|project|postcss|deploy|README\.md)/,
  asar: true,
  prune: true,
  overwrite: true,
  appCopyright: copyright,
  appVersion: version,
  buildVersion: version,
  electronVersion: electron.version,
  ...getPlatform(platform)
})
.then( appPaths => {
  console.log(appPaths)
})
.catch( err => {
  console.log(err)
})

function getPlatform (platform) {
  let options = null
  if (/^(mac|mas)/.test(platform)) {
    options = {
      icon: path.resolve(__dirname, '../assets/icons/osx/app.icns'),
    }
  }
  if (/^(win)/.test(platform)) {
    options = {
      icon: path.resolve(__dirname, '../assets/icons/win/app.ico'),
    }
  }
  switch (platform) {
    case 'mac':
      return { ...options, platform: 'darwin', arch: 'x64' }
    case 'mas':
      return { ...options, platform: 'mas', arch: 'x64' }
    case 'win32':
      return { ...options, platform: 'win32', arch: 'ia32' }
    case 'win64':
      return { ...options, platform: 'win32', arch: 'x64' }
    case 'linux':
      return { platform: 'linux', arch: 'x64' }
    default:
      return { all: true }
  }
}