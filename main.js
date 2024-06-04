const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const { httpGet, downloadFile, downloadFileProgress, openLink } = require('./webFunctions');
const { fileExists, clearCache, getCacheSize } = require('./fileFunctions');
const { deletePack, downloadPack, updatePack, activatePack, resetAllPacks, getInstalledPacks, getActivePacks, getActivePacksInOrder, getPackMetaData } = require('./packFunctions');
const { setDBDPath, setDBDPathFromDialog, getDBDPath } = require('./options');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 600,
    minHeight: 500,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  win.loadFile('app/index.html')
}

app.whenReady().then(() => {

  ipcMain.handle('webFunctions:httpGet', httpGet);
  ipcMain.handle('webFunctions:dowloadFile', downloadFile);
  ipcMain.handle('webFunctions:downloadFileProgress', downloadFileProgress);
  ipcMain.handle('webFunctions:openLink', openLink);

  ipcMain.handle('packFunctions:downloadPack', downloadPack);
  ipcMain.handle('packFunctions:deletePack', deletePack);
  ipcMain.handle('packFunctions:updatePack', updatePack);
  ipcMain.handle('packFunctions:activatePack', activatePack);
  ipcMain.handle('packFunctions:resetAllPacks', resetAllPacks);
  ipcMain.handle('packFunctions:getInstalledPacks', getInstalledPacks);
  ipcMain.handle('packFunctions:getActivePacks', getActivePacks);
  ipcMain.handle('packFunctions:getActivePacksInOrder', getActivePacksInOrder);
  ipcMain.handle('packFunctions:getPackMetaData', getPackMetaData);

  ipcMain.handle('fileFunctions:fileExists', fileExists);
  ipcMain.handle('fileFunctions:clearCache', clearCache);
  ipcMain.handle('fileFunctions:getCacheSize', getCacheSize);

  ipcMain.handle('options:setDBDPath', setDBDPath);
  ipcMain.handle('options:setDBDPathFromDialog', setDBDPathFromDialog);
  ipcMain.handle('options:getDBDPath', getDBDPath);

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})