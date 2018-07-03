const path = require('path')
const zip = require('electron-installer-zip')
const { productName, version } = require('../package.json')
const _ = require('lodash')

const { platform } = _.zipObject([,,'platform'], process.argv)
const opts = getPlatform(platform)

opts && zip(opts, (err, res) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Zip file written to: ', res)
})

function getPlatform (platform) {
  switch (platform) {
    case 'mac':
      return {
        dir: path.resolve(__dirname, '../releases', `${productName}-darwin-x64/${productName}.app`),
        out: path.resolve(__dirname, '../out', `${productName}-darwin-x64`)
      }
    case 'mas':
      return {
        dir: path.resolve(__dirname, '../releases', `${productName}-mas-x64/${productName}.app`),
        out: path.resolve(__dirname, '../out', `${productName}-mas-x64`)
      }
    case 'win32':
      return {
        dir: path.resolve(__dirname, '../releases', `${productName}-win32-ia32/${productName}.exe`),
        out: path.resolve(__dirname, '../out', `${productName}-win32-ia32`)
      }
    case 'win64':
      return {
        dir: path.resolve(__dirname, '../releases', `${productName}-win32-x64/${productName}.exe`),
        out: path.resolve(__dirname, '../out', `${productName}-win32-x64`)
      }
    case 'linux':
      return {
        dir: path.resolve(__dirname, '../releases', `${productName}-linux-x64/${productName}`),
        out: path.resolve(__dirname, '../out', `${productName}-linux-x64`)
      }
    default:
      return null
  }
}