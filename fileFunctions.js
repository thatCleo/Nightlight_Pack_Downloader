const fs = require('fs');
const StreamZip = require('node-stream-zip');
const { dialog } = require('electron');

function fileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        console.log(`[fileExists] File "${filePath}" exists.`);
        return true;
    } catch (err) {
        console.log(`[fileExists] File "${filePath}" does not exist.`);
        return false;
    }
}

async function deleteFile(path) {
    return new Promise((resolve, reject) => {
        fs.rmSync(path, { recursive: true }, (err) => {
            if (err) {
                console.error('[deleteFile] Error deleting folder:', err);
                reject(err);
            } else {
                console.log('[deleteFile] Folder deleted successfully');
                resolve();
            }
        });
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

async function clearCache() {
    let path = __dirname;
    path = path.replace('resources/app.asar', '');
    path += '/data/cached_images';

    console.log('[clearCache] Clearing Cache...');

    return new Promise((resolve, reject) => {
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
    clearCache
}