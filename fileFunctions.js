const fs = require('fs');
const StreamZip = require('node-stream-zip');

function fileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        console.log(`File "${filePath}" exists.`);
        return true;
    } catch (err) {
        console.log(`File "${filePath}" does not exist.`);
        return false;
    }
}

async function copyFile(sourcePath, destinationPath) {
    try {
        fs.cpSync(sourcePath, destinationPath, { recursive: true });
        console.log(`File "${sourcePath}" copied successfully to "${destinationPath}"`);
    } catch (err) {
        console.error('Error copying file:', err);
    }

}

async function unzipFile(filePath, destination) {

    return new Promise((resolve, reject) => {

        if (!fileExists(destination)) {
            console.log(`Creating directory...`);
            fs.mkdirSync(destination, { recursive: true });
        } else {
            console.log(`Directory "${destination}" already exists.`);
        }

        if (!fileExists(filePath)) {
            console.log(`File "${filePath}" does not exist.`);
            return;
        }

        const zip = new StreamZip({ file: filePath });

        zip.on('error', (err) => console.error('Error unzipping file:', err));

        zip.on('ready', () => {
            console.log('Unzipping file...');
            zip.extract(null, destination, (err, count) => {
                console.log(err ? 'Extract error' : `Extracted ${count} entries`);
                zip.close();
                resolve();
            });

        });
    })
}


module.exports = {
    fileExists,
    copyFile,
    unzipFile
}