const fs = require('fs');
const path = require('path');
const StreamZip = require('node-stream-zip');
const { dialog } = require('electron');
const { log } = require('console');

function fileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        // console.log(`[fileExists] File "${filePath}" exists.`);
        return true;
    } catch (err) {
        // console.log(`[fileExists] File "${filePath}" does not exist.`);
        return false;
    }
}

async function deleteFile(path) {
    console.log('[deleteFile] deleting ' + path);
    return new Promise((resolve, reject) => {
        try {
            fs.rmSync(path, { recursive: true }, (err) => {
                if (err) {
                    console.error('[deleteFile] Error deleting folder:', err);
                    reject(err);
                } else {
                    console.log('[deleteFile] Folder deleted successfully');
                    resolve();
                }

            });
        } catch (err) {
            console.log('[deleteFile] Error: ' + err);
            reject(err);
        }
    })
}

async function copyFile(sourcePath, destinationPath) {
    return new Promise((resolve, reject) => {
        try {
            fs.cpSync(sourcePath, destinationPath, { recursive: true });
            console.log(`[copyFile] File "${sourcePath}" copied successfully to "${destinationPath}"`);
        } catch (err) {
            console.error('[copyFile] Error copying file:', err);
        } finally {
            resolve();
        }
    })
}

async function unzipFile(filePath, destination) {

    return new Promise((resolve, reject) => {

        if (!fileExists(destination)) {
            console.log(`[unzipFile] Creating directory...`);
            fs.mkdirSync(destination, { recursive: true });
        } else {
            console.log(`[unzipFile] Directory "${destination}" already exists.`);
        }

        if (!fileExists(filePath)) {
            console.log(`[unzipFile] File "${filePath}" does not exist.`);
            return;
        }

        const zip = new StreamZip({ file: filePath });

        zip.on('error', (err) => console.error('[unzipFile] Error unzipping file:', err));

        zip.on('ready', () => {
            console.log('[unzipFile] Unzipping file...');
            zip.extract(null, destination, (err, count) => {
                console.log(err ? '[unzipFile] Extract error' : `[unzipFile] Extracted ${count} entries`);
                zip.close();
                resolve();
            });

        });
    })
}

async function getPathFromDialog() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });

    if (!canceled) {
        return filePaths[0]
    }
}

function getDirectorySize(directoryPath, callback) {
    let totalSize = 0;

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            callback(err);
            return;
        }

        let pending = files.length;

        if (!pending) {
            // If directory is empty, return 0 size
            callback(null, 0);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directoryPath, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    callback(err);
                    return;
                }

                if (stats.isDirectory()) {
                    getDirectorySize(filePath, (err, size) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        totalSize += size;
                        if (!--pending) callback(null, totalSize);
                    });
                } else {
                    totalSize += stats.size;
                    if (!--pending) callback(null, totalSize);
                }
            });
        });
    });
}

function getCacheSize() {
    let path = __dirname;
    path = path.replace('resources/app.asar', '');
    path += '/data/cached_images';

    return new Promise((resolve, reject) => {
        if (!fileExists(path)) {
            resolve(0);
            return;
        }
        getDirectorySize(path, (err, size) => {
            if (err) {
                console.error('Error:', err);
                return;
            }
            resolve(String(size / 1000).split('.')[0]);
        });
    })
}

async function clearCache() {
    let path = __dirname;
    path = path.replace('resources/app.asar', '');
    path += '/data/cached_images';

    return new Promise((resolve, reject) => {

        if (!fileExists(path)) return;

        console.log('[clearCache] Clearing Cache...');

        deleteFile(path);
        resolve(true);
    });
}

const getDirectoriesInPath = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);


module.exports = {
    fileExists,
    deleteFile,
    copyFile,
    unzipFile,
    getPathFromDialog,
    getDirectoriesInPath,
    clearCache,
    getCacheSize
}