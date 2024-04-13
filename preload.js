const { contextBridge, ipcRenderer, app } = require('electron');
const fs = require('fs');
const { currentDirectory } = require('./options');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

// contextBridge.exposeInMainWorld('directory', {
//   currentPath: () => __dirname
// });

contextBridge.exposeInMainWorld('electron', {
  Buffer: require('buffer').Buffer
});

contextBridge.exposeInMainWorld('fs', fs);

// contextBridge.exposeInMainWorld('directory', {
//   currentPath: () =>  ipcRenderer.invoke('directory.current')
// })

contextBridge.exposeInMainWorld('webFunctions', {
  httpGet: (url) => ipcRenderer.invoke('webFunctions:httpGet', url),
  downloadFile: (url, directoryPath, fileName) => ipcRenderer.invoke('webFunctions:dowloadFile', url, directoryPath, fileName),
  downloadFileProgress: (url, directoryPath, fileName, element) => ipcRenderer.invoke('webFunctions:downloadFileProgress', url, directoryPath, fileName, element)
})

contextBridge.exposeInMainWorld('packFunctions', {
  downloadPack: (url, packData) => ipcRenderer.invoke('packFunctions:downloadPack', url, packData),
  deletePack: (url, button) => ipcRenderer.invoke('packFunctions:deletePack', url, button),
  activatePack: (url) => ipcRenderer.invoke('packFunctions:activatePack', url),
  resetAllPacks: () => ipcRenderer.invoke('packFunctions:resetAllPacks'),
  getInstalledPacks: () => ipcRenderer.invoke('packFunctions:getInstalledPacks'),
  getActivePacks: () => ipcRenderer.invoke('packFunctions:getActivePacks'),
  getPackMetaData: (url) => ipcRenderer.invoke('packFunctions:getPackMetaData', url)
})

contextBridge.exposeInMainWorld('directory', {
  currentPath: () =>  currentDirectory
})

contextBridge.exposeInMainWorld('options', {
  setDBDPath: (value) => ipcRenderer.invoke('options:setDBDPath', value),
  setDBDPathFromDialog: () => ipcRenderer.invoke('options:setDBDPathFromDialog'),
  getDBDPath: () => ipcRenderer.invoke('options:getDBDPath')
})