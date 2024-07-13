const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const { currentDirectory } = require("./options");
const { updatePack } = require("./packFunctions");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  app: () => "0.2.9-beta.1", // Github release name
});

contextBridge.exposeInMainWorld("fs", fs);

contextBridge.exposeInMainWorld("webFunctions", {
  httpGet: (url) => ipcRenderer.invoke("webFunctions:httpGet", url),
  downloadFile: (url, directoryPath, fileName) =>
    ipcRenderer.invoke(
      "webFunctions:dowloadFile",
      url,
      directoryPath,
      fileName,
    ),
  downloadFileProgress: (url, directoryPath, fileName, element) =>
    ipcRenderer.invoke(
      "webFunctions:downloadFileProgress",
      url,
      directoryPath,
      fileName,
      element,
    ),
  openLink: (url) => ipcRenderer.invoke("webFunctions:openLink", url),
});

contextBridge.exposeInMainWorld("packFunctions", {
  downloadPack: (url, packData) =>
    ipcRenderer.invoke("packFunctions:downloadPack", url, packData),
  deletePack: (url, button) =>
    ipcRenderer.invoke("packFunctions:deletePack", url, button),
  updatePack: (url, packData) =>
    ipcRenderer.invoke("packFunctions:updatePack", url, packData),
  activatePack: (url) => ipcRenderer.invoke("packFunctions:activatePack", url),
  resetAllPacks: () => ipcRenderer.invoke("packFunctions:resetAllPacks"),
  getInstalledPacks: () =>
    ipcRenderer.invoke("packFunctions:getInstalledPacks"),
  getActivePacks: () => ipcRenderer.invoke("packFunctions:getActivePacks"),
  getActivePacksInOrder: () =>
    ipcRenderer.invoke("packFunctions:getActivePacksInOrder"),
  getPackMetaData: (url) =>
    ipcRenderer.invoke("packFunctions:getPackMetaData", url),
});

contextBridge.exposeInMainWorld("fileFunctions", {
  clearCache: () => ipcRenderer.invoke("fileFunctions:clearCache"),
  getCacheSize: () => ipcRenderer.invoke("fileFunctions:getCacheSize"),
});

contextBridge.exposeInMainWorld("directory", {
  currentPath: () => currentDirectory,
});

contextBridge.exposeInMainWorld("options", {
  setDBDPath: (value) => ipcRenderer.invoke("options:setDBDPath", value),
  setDBDPathFromDialog: () =>
    ipcRenderer.invoke("options:setDBDPathFromDialog"),
  getDBDPath: () => ipcRenderer.invoke("options:getDBDPath"),
  getCheckForPackUpdateOnStartup: () =>
    ipcRenderer.invoke("options:getCheckForPackUpdateOnStartup"),
  setCheckForPackUpdateOnStartup: (check) =>
    ipcRenderer.invoke("options:setCheckForPackUpdateOnStartup", check),
  getCheckForAppUpdateOnStartup: () =>
    ipcRenderer.invoke("options:getCheckForAppUpdateOnStartup"),
  setCheckForAppUpdateOnStartup: (check) =>
    ipcRenderer.invoke("options:setCheckForAppUpdateOnStartup", check),
});
