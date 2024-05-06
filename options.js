const { getPathFromDialog, fileExists } = require('./fileFunctions');
const fs = require('fs');
const { app } = require('electron');

let dbd_game_path = '';
let pack_order = [];

let currentDirectory = __dirname;
currentDirectory = currentDirectory.replace('resources/app.asar', '');
currentDirectory += '/data'
console.log('Dir: ' + currentDirectory);

loadOptions();

function loadOptions() {
    if (fileExists(`${currentDirectory}/options.json`)) {
        let options = JSON.parse(fs.readFileSync(`${currentDirectory}/options.json`, 'utf8'));
        dbd_game_path = options.dbd_game_path;
        pack_order = options.pack_order;
    }
}

async function getDBDPath() {
    return new Promise((resolve, reject) => {
        resolve(dbd_game_path);
    })
}

function getDBDPathSync() {
    return dbd_game_path;
}

async function setDBDPathFromDialog() {
    console.log(`Setting DBD Path...`);
    const path = await getPathFromDialog();
    if (path) {
        dbd_game_path = path;
        console.log(`DBD Game Path: ${dbd_game_path}`);
        const json_string = {
            "dbd_game_path": dbd_game_path,
            "pack_order": pack_order
        }
        fs.writeFileSync(`${currentDirectory}/options.json`, JSON.stringify(json_string));
    }
}

async function setDBDPath(event, value) {
    console.log(`Setting DBD Path...`);
    if(fileExists(value)) {
        dbd_game_path = value;
        console.log(`DBD Game Path: ${dbd_game_path}`);
        const json_string = {
            "dbd_game_path": dbd_game_path,
            "pack_order": pack_order
        }
        fs.writeFileSync(`${currentDirectory}/options.json`, JSON.stringify(json_string));
    }
}

function getPackOrderSync() {
    return pack_order;
}

async function setPackOrder(url) {
    pack_order.splice(0, 0, url);
    const json_string = {
        "dbd_game_path": dbd_game_path,
        "pack_order": pack_order
    }
    fs.writeFileSync(`${currentDirectory}/options.json`, JSON.stringify(json_string));
}

async function clearPackOrder() {
    pack_order = [];
    const json_string = {
        "dbd_game_path": dbd_game_path,
        "pack_order": pack_order
    }
    fs.writeFileSync(`${currentDirectory}/options.json`, JSON.stringify(json_string));
}

module.exports = {
    setDBDPath,
    setDBDPathFromDialog,
    getDBDPath,
    getDBDPathSync,
    setPackOrder,
    getPackOrderSync,
    clearPackOrder,
    dbd_game_path,
    currentDirectory
}