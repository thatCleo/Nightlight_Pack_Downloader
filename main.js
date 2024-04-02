const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const { httpGet, downloadFile, downloadFileProgress } = require('./webFunctions');
const { fileExists } = require('./fileFunctions');
const { deletePack, downloadPack, activatePack, resetAllPacks, getInstalledPacks, getPackMetaData } = require('./packFunctions');
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

  ipcMain.handle('packFunctions:downloadPack', downloadPack);
  ipcMain.handle('packFunctions:deletePack', deletePack);
  ipcMain.handle('packFunctions:activatePack', activatePack);
  ipcMain.handle('packFunctions:resetAllPacks', resetAllPacks);
  ipcMain.handle('packFunctions:getInstalledPacks', getInstalledPacks);
  ipcMain.handle('packFunctions:getPackMetaData', getPackMetaData);

  ipcMain.handle('fileFunctions:fileExists', fileExists);

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

// ipcMain.handle('directory:current', () => {
//   console.log('currentPath: ' + __dirname);
//   return __dirname;
// })

// ipcMain.handle('webFunctions:httpGet', async (url) => {
//   console.log('httpGet: ' + url);
//   http.get(url, response => {
//     let rawData = '';

//     response.on('data', chunk => {
//       rawData += chunk;
//     });

//     response.on('end', () => {
//       const parsedData = JSON.parse(rawData);
//       resolve(parsedData);
//     });

//   }).on('error', (error) => {
//     console.log(`Error: ${error.message} pls fix`);
//     rejects('Error: ' + error);
//   });
//   // httpGet(url);
// })

// ipcMain.handle('webFunctions:downloadPack', (url, button) => {
//   downloadPack(url, button);
// })