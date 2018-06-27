import path from 'path'
import { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage } from 'electron'
import { productName, version, copyright, credits } from '../package.json'
import electron from 'electron/package.json'
import { applicationMenu } from './menu'
import storage from 'electron-json-storage'

const __MACOS__  = process.platform === 'darwin'
const distDir = path.resolve(__dirname, '../dist')

const mainPage = `file://${distDir}/index.html`
const mainArgs = {
  name         : 'app',
  width        : 1240,
  height       : 740,
  minWidth     : 1240,
  minHeight    : 740,
  frame        : !__MACOS__,
  titleBarStyle: __MACOS__ ? 'default' : 'hiddenInset',
  autoHideMenuBar: true,
  resizable    : true
}

var mainWindow = null
app.setName(productName)
var userData = app.getPath('userData')
storage.set('app', {
  name: productName,
  version: version,
  userData: userData,
  platform: process.platform
}, error => {
  if (error) throw error
})

if (__MACOS__) {
  app.setAboutPanelOptions({
    applicationName: productName,
    applicationVersion: version,
    copyright: copyright,
    credits: credits,
    version: electron.version
  })
}

function openIt () {
  mainWindow = new BrowserWindow(mainArgs)
  mainWindow.loadURL(mainPage)
  //mainWindow.webContents.openDevTools()
  mainWindow.setTitle(productName)
  mainWindow.on('close', () => {
    mainWindow = null
  })
  mainWindow.on('focus', function() {
    if(mainWindow && mainWindow.webContents)
      mainWindow.webContents.send('focusWindow')
  })
  mainWindow.on('blur', function() {
    if(mainWindow && mainWindow.webContents)
      mainWindow.webContents.send('blurWindow')
  })
  // 加载菜单栏
  Menu.setApplicationMenu(applicationMenu)
  // 加载系统托盘
  setTray(mainWindow)

  ipcMain.on('win-tools', (evt, args) => {
    switch (args) {
      case 'hide': 
        app.hide()
        break
      case 'quit': 
        app.quit()
        break
      default:
        break
    }
  })
}

app.on('ready', openIt)

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

if (shouldQuit) {
  app.quit()
}

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('open-file', function(e) {
  // console.log('reopen');
  if(mainWindow) {
    mainWindow.show()
    mainWindow.focus()
  } else {
    openIt()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    openIt()
  }
})

// 设置系统托盘
const setTray = (win) => {
  let image = nativeImage.createFromPath(path.resolve(__dirname, '../assets/icons/osx/icon_18.png'))
  let appIcon = new Tray(image)
  appIcon.setToolTip(productName)
  appIcon.setContextMenu(Menu.buildFromTemplate([
    {
      label: `打开${productName}`, 
      click: () => {
        win.show()
      }
    },
    {
      type: 'separator'
    },
    {
      label: `退出${productName}`, 
      click: () => {
        app.quit()
      }
    },
  ]))
  appIcon.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
}