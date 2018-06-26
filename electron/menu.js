const { app, Menu } = require('electron')
const { productName } = require('../package.json')

const __MACOS__  = process.platform === 'darwin'
const applicationMenu = []

if (__MACOS__) {
  applicationMenu.unshift({
    label: productName,
    submenu: [
      {
        label: `关于${productName}`,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: `退出${productName}`,
        accelerator: 'Command+Q',
        click: () => app.quit()
      }
    ]
  })
}

exports.applicationMenu = Menu.buildFromTemplate(applicationMenu)