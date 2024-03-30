const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');


contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('directory', {
  currentPath: () => __dirname
});

contextBridge.exposeInMainWorld('electron', {
  Buffer: require('buffer').Buffer
});

contextBridge.exposeInMainWorld('fs', fs);