const { Buffer } = require('buffer');
const fs = require('fs');
const https = require('https');
const { fileExists } = require('./fileFunctions');

async function httpGet(event, url) {
    console.log(url)
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Nightlight_Pack_Downloader' } }, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            // Any 2xx status code signals a successful response but
            // here we're only checking for 200.
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            }
            if (error) {
                console.error(error.message);
                // Consume response data to free up memory
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    //const parsedData = JSON.parse(rawData);
                    resolve(rawData);
                } catch (e) {
                    resolve(`Error: ${e.message}`);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    })
}

async function downloadFile(event, downloadURL, directoryPath, fileName) {
    //console.log(`Downloading ${fileName}`);
    try {
        const response = await fetch(downloadURL);
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const buffer = Buffer.from(uint8Array);

        if (!fs.existsSync(`${directoryPath}/`)) {
            console.log(`Directory "${directoryPath}" does not exist. Creating...`);
            fs.mkdirSync(`${directoryPath}/`, { recursive: true });
        }

        const filePath = `${directoryPath}/${fileName}`;
        fs.writeFileSync(filePath, buffer);

        //console.log(`File "${fileName}" downloaded successfully into ${directoryPath}`);
        return filePath;
    } catch (error) {
        //console.error('Error downloading file:', error);
        return null;
    }
}

async function downloadFileProgress(event, downloadURL, directoryPath, fileName, element) {
    console.log(`Downloading ${fileName}`);
    try {
        const response = await fetch(downloadURL);
        const contentLength = parseInt(response.headers.get('Content-Length'), 10);
        let downloadedBytes = 0;

        const buffers = [];

        const reader = response.body.getReader();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffers.push(value);
            downloadedBytes += value.length;

            // Calculate progress percentage
            const progress = Math.floor((downloadedBytes / contentLength) * 100);

            // Update progress bar (if available)
            updateProgressBar(progress, element);
        }

        // Concatenate all the buffers into a single buffer
        const concatenatedBuffer = concatBuffers(buffers);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(`${directoryPath}/`)) {
            console.log(`Directory "${directoryPath}" does not exist. Creating...`);
            fs.mkdirSync(`${directoryPath}/`, { recursive: true });
        }

        // Write the concatenated buffer to the file
        fs.writeFileSync(`${directoryPath}/${fileName}`, concatenatedBuffer);

        console.log(`File "${fileName}" downloaded successfully into ${directoryPath}`);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
}

// Function to concatenate an array of buffers into a single buffer
function concatBuffers(buffers) {
    // Calculate the total length of all buffers
    const totalLength = buffers.reduce((acc, buffer) => acc + buffer.length, 0);

    // Create a new Uint8Array with the combined length
    const concatenatedBuffer = new Uint8Array(totalLength);

    // Copy the contents of each buffer into the new buffer
    let offset = 0;
    for (const buffer of buffers) {
        concatenatedBuffer.set(buffer, offset);
        offset += buffer.length;
    }

    return concatenatedBuffer;
}

function updateProgressBar(progress, element) {
    // Update the progress bar element
    element.innerText = `${progress}%`;
    if (progress === 100) {
        element.innerText = `Done!`;
    }
}

module.exports = {
    httpGet,
    downloadFile,
    downloadFileProgress
}