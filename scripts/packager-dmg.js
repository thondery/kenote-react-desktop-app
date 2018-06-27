const path = require('path')
const createDMG = require('electron-installer-dmg')
const { productName, version } = require('../package.json')

createDMG({
  appPath: path.resolve(__dirname, '../releases', `${productName}-darwin-x64/${productName}.app`),
  name: `${productName}-${version}`,
  icon: path.resolve(__dirname, '../assets/icons/osx/app.icns'),
  out: path.resolve(__dirname, '../releases'),
  overwrite: true,
}, (err) => {
  if (err) {
    console.warn(err)
  }
});