const path = require('path');
const { getPathFromDialog, fileExists } = require('./fileFunctions');
const fs = require('fs');
const { userInfo } = require('os');
const { checkForValidDDPath } = require('./packFunctions');
const { dialog } = require('electron');

let dbd_game_path = '';
let pack_order = [];
let check_for_packupdates_on_startup = false;
let check_for_appupdate_on_startup = false;

const currentDirectory = path.join('/home/', userInfo().username, '/.local/share/nightlight_pack_downloader');
if (!fileExists(currentDirectory)) {
    fs.mkdirSync(currentDirectory);
}

console.log('Dir: ' + currentDirectory);

loadOptions();

function loadOptions() {
    if (fileExists(`${currentDirectory}/options.json`)) {
        let options = JSON.parse(fs.readFileSync(`${currentDirectory}/options.json`, 'utf8'));
        dbd_game_path = options.dbd_game_path;
        pack_order = options.pack_order;
        check_for_packupdates_on_startup = options.check_for_packupdates_on_startup;
        check_for_appupdate_on_startup = options.check_for_appupdate_on_startup;
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
        setDBDPath(null, path);
    }
}

async function setDBDPath(event, value) {
    console.log(`Setting DBD Path...`);
    if (fileExists(`${value}/DeadByDaylight.exe`)) {
        dbd_game_path = value;
        console.log(`DBD Game Path: ${dbd_game_path}`);
        saveOptions();
        dialog.showMessageBox(
            {
                type: 'info',
                message: `The path is saved.`,
                detail: `${value}`,
                title: "Game path saved"
            }
        );
    } else {
        dialog.showErrorBox("Invalid game path", `The path (${value}) set is invalid. Please verify your Dead by Daylight installation path.`);
    }
}

function getPackOrderSync() {
    return pack_order;
}

async function setPackOrder(url) {
    pack_order.splice(0, 0, url);
    saveOptions();
}

async function clearPackOrder() {
    pack_order = [];
    saveOptions();
}

async function getCheckForPackUpdateOnStartup() {
    return new Promise((resolve, reject) => {
        resolve(check_for_packupdates_on_startup);
    })
}

async function setCheckForPackUpdateOnStartup(event, check) {
    check_for_packupdates_on_startup = check;
    saveOptions();
}

async function getCheckForAppUpdateOnStartup() {
    return new Promise((resolve, reject) => {
        resolve(check_for_appupdate_on_startup)
    })
}

async function setCheckForAppUpdateOnStartup(event, check) {
    check_for_appupdate_on_startup = check;
    saveOptions();
}

function checkForDataFolder() {
    if (!fs.existsSync(`${currentDirectory}/`)) {
        fs.mkdirSync(`${currentDirectory}/`, { recursive: true });
    }
}

function saveOptions() {
    checkForDataFolder();
    const json_string = {
        "dbd_game_path": dbd_game_path,
        "pack_order": pack_order,
        "check_for_packupdates_on_startup": check_for_packupdates_on_startup,
        "check_for_appupdate_on_startup": check_for_appupdate_on_startup
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
    getCheckForPackUpdateOnStartup,
    setCheckForPackUpdateOnStartup,
    getCheckForAppUpdateOnStartup,
    setCheckForAppUpdateOnStartup,
    dbd_game_path,
    currentDirectory
}