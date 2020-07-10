const { ipcMain, BrowserWindow, Menu } = require('electron')
const { puppeteerScript } = require('../../../puppeteerScript')

ipcMain.handle('context-menu', async (event, sources) => {
  const source = JSON.parse(sources)

  const contextMenu =
    Menu.buildFromTemplate(
      source.data.map(item => ({
        label: item.name,
        click: () =>
          source.type === 'input'
            ? event.sender.send('select-source', item)
            : event.sender.send('select-output', item)
      }))
  )
  contextMenu.popup()
})

ipcMain.handle('start', async () => {
  BrowserWindow.getFocusedWindow().minimize()
  await puppeteerScript()
})
