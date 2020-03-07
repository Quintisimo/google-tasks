const { Menu } = require('electron')
const { menubar } = require('menubar')

const mb = menubar({
  loadUrlOptions: {
    // Useragent required for google login
    // https://github.com/firebase/firebase-js-sdk/issues/2478#issuecomment-572258349
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) old-airport-include/1.0.0 Chrome Electron/7.1.7 Safari/537.36'
  },
  browserWindow: {
    width: 300,
    resizable: false
  }
})

mb.on('after-create-window', () => {
  mb.window.loadURL(
    'https://tasks.google.com/embed/?origin=https://mail.google.com'
  )

  const menu = Menu.buildFromTemplate([
    {
      label: 'Restart',
      click: () => {
        mb.app.relaunch()
        mb.app.quit()
      }
    },
    {
      label: 'Quit',
      click: () => mb.app.quit()
    }
  ])

  mb.tray.on('right-click', () => mb.tray.popUpContextMenu(menu))
})
