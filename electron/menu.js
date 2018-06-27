import { app, Menu } from 'electron'
import { productName } from '../package.json'

const __MACOS__  = process.platform === 'darwin'
const applicationMenuTemplate = []

if (__MACOS__) {
  applicationMenuTemplate.unshift({
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

export const applicationMenu = Menu.buildFromTemplate(applicationMenuTemplate)