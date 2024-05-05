const { downloadFile } = require('./webFunctions');
const { fileExists, deleteFile, copyFile, unzipFile, getDirectoriesInPath } = require('./fileFunctions');
const { getDBDPathSync, currentDirectory } = require('./options');
const fs = require('fs');
const { dialog } = require('electron');

const dbd_icon_path = '/DeadByDaylight/Content/UI/Icons/';

async function deletePack(event, pack_url) {
    console.log(`[deletePack] Deleting ${pack_url}`);

    getInstalledPacks()
        .then(data => {
            let installed_packs = data;
            let new_installed_packs = [];

            for (let i = 0; i < installed_packs.length; i++) {
                if (installed_packs[i].toString() !== pack_url) {
                    new_installed_packs.push(installed_packs[i]);
                }
            }

            const path = `${currentDirectory}/packfiles/${pack_url}`;

            deleteFile(path);

            const json_string = {
                "installedPacks": new_installed_packs,
            }
            fs.writeFileSync(`${currentDirectory}/packfiles/installedPacks.json`, JSON.stringify(json_string));
        })
}

async function downloadPack(event, url, packData) {
    return new Promise((resolve, reject) => {

        console.log(`[downloadPack] Downloading pack: ${url}`);
        const download_url = `https://nightlight.gg/packs/${url}/download`;
        const directory_path = `${currentDirectory}/packfiles/${url}`;
        const file_name = `${url}.zip`
        downloadFile(event, download_url, directory_path, file_name)
            .then(() => {

                getInstalledPacks()
                    .then((installed_packs) => {
                        console.log(`[downloadPack] Installed packs: ${installed_packs}`);
                        if (!installed_packs.includes(url)) {
                            installed_packs.push(url);
                        }
                        const json_string = {
                            "installedPacks": installed_packs
                        }
                        fs.writeFileSync(`${currentDirectory}/packfiles/installedPacks.json`, JSON.stringify(json_string));

                        /* Copy data from cache to pack path */
                        let id;
                        let title;
                        let version;
                        let current_version;
                        let last_updated;
                        let dbd_version;
                        let has;

                        let username = [];
                        let user_id = [];
                        let avatar_id = [];
                        let avatar_path = [];

                        packData.forEach(pack => {
                            if (pack.url == url) {
                                id = pack.id;
                                title = pack.title;
                                version = pack.version;
                                current_version = pack.current_version;
                                last_updated = pack.updated_at;
                                dbd_version = pack.dbd_version;
                                has = pack.has;

                                const creators = pack.creators;
                                creators.forEach(creator => {

                                    if (creator.user != null) {
                                        user_id.push(creator.user.user_id);
                                        avatar_id.push(creator.user.avatar_id);
                                        username.push(creator.username);

                                        let creatorAvatar = `${currentDirectory}/cached_images/placeholder/avatar.png`;
                                        if (fileExists(`${currentDirectory}/cached_images/${creator.user.user_id}_${creator.user.avatar_id}/avatar.png`)) {
                                            creatorAvatar = `${currentDirectory}/cached_images/${creator.user.user_id}_${creator.user.avatar_id}/avatar.png`;
                                        }
                                        fs.copyFile(`${creatorAvatar}`, `${directory_path}/${creator.user.user_id}_avatar.png`, (err) => {
                                            console.log(`[downloadPack] Copied ${creatorAvatar} to ${directory_path}/${creator.user.user_id}_avatar.png`);
                                            if (err) {
                                                console.warn("[downloadPack] Error copying file:", err);
                                            }
                                        })
                                        avatar_path.push(creatorAvatar);
                                    }
                                    else {
                                        user_id.push(null);
                                        avatar_id.push(null);
                                        username.push(creator.username);
                                    }
                                });
                            }
                        });

                        const users = [];
                        for (let i = 0; i < user_id.length; i++) {
                            users.push({
                                user_id: user_id[i],
                                username: username[i],
                                avatar_id: avatar_id[i]
                            });
                        }

                        const jsonData = {
                            id: id,
                            url: url,
                            title: title,
                            version: version,
                            downloaded_at: new Date().toISOString().slice(0, 10),
                            last_updated: last_updated,
                            dbd_version: dbd_version,
                            has: has,
                            user: users
                        }

                        fs.writeFileSync(`${directory_path}/metadata.json`, JSON.stringify(jsonData));

                        const cachePath = `${currentDirectory}/cached_images/${id}_${current_version}`;
                        fs.copyFile(`${cachePath}/banner.png`, `${directory_path}/banner.png`, (err) => {
                            if (err) {
                                console.warn("Error copying file:", err);
                            } else {
                                console.log(`[downloadPack] Copied ${cachePath}/banner.png to ${directory_path}/banner.png`);
                            }
                        })
                        console.log(`[downloadPack] Pack ${url} downloaded successfully`);
                        resolve(url);
                    })
            });
    })
}

async function activatePack(event, url) {
    const zipPath = `${currentDirectory}/packfiles/${url}/${url}.zip`;
    const targetPath = `${currentDirectory}/temp/${url}/`;

    if (!checkForValidDDPath()) return;

    // resetAllPacks();

    if (!fileExists(zipPath)) {
        dialog.showErrorBox("Files not found", `The Icon files for the Pack you were about to activate are missing.\nPlease download the Pack from the store to use it in Dead by Daylight.`);
        return;
    }

    unzipFile(zipPath, targetPath)
        .then(() => {
            copyFile(targetPath, getDBDPathSync() + dbd_icon_path)
                .then(() => {
                    deleteFile(targetPath);
                })
        });

    const packPath = `${currentDirectory}/packfiles/${url}`;
    fs.writeFileSync(`${packPath}/.active`, '');
}

function deactivatePack(event, url) {
    const active_packs = getActivePacksSync();
    console.log(active_packs);
    for (let i = 0; i < active_packs.length; i++) {
        if(url !== active_packs[i]) {
            console.log(active_packs[i]);
            activatePack(null, active_packs[i]);
        }
    }

    const packPath = `${currentDirectory}/packfiles/${url}`;
    deleteFile(`${packPath}/.active`, '');
}

function resetAllPacks() {
    console.log("[resetAllPacks] Resetting all packs...");

    if (!checkForValidDDPath()) return;

    try {
        getDirectoriesInPath(getDBDPathSync() + dbd_icon_path).forEach(directory => {
            deleteFile(`${getDBDPathSync() + dbd_icon_path}/${directory}`);
        })
    } catch (err) {
        console.log("[resetAllPacks] Error deleting files: " + err);
    }

    getDirectoriesInPath(`${currentDirectory}/packfiles`).forEach(directory => {
        try {
            deleteFile(`${currentDirectory}/packfiles/${directory}/.active`);
        }
        catch (err) {
            console.log(`[resetAllPacks] Pack '${directory}' is not active. Skipping...`);
        }
    })
}

function getInstalledPacks() {
    console.log("[getInstalledPacks] Getting installed packs...");
    return new Promise((resolve, reject) => {
        let installed_packs;
        if (fileExists(`${currentDirectory}/packfiles/installedPacks.json`)) {
            installed_packs = JSON.parse(fs.readFileSync(`${currentDirectory}/packfiles/installedPacks.json`, 'utf8')).installedPacks;
        } else {
            installed_packs = [];
        }
        resolve(installed_packs);
    })
}

function getActivePacks() {
    return new Promise((resolve, reject) => {
        resolve(getActivePacksSync());
    })
}

function getActivePacksSync() {
    console.log("[getActivePacksSync] Getting active packs...");
    let active_packs = [];
    getDirectoriesInPath(`${currentDirectory}/packfiles`).forEach(directory => {
        if (fileExists(`${currentDirectory}/packfiles/${directory}/.active`)) {
            active_packs.push(directory);
        }
    })
    return active_packs;

}

function getPackMetaData(event, pack_url) {
    return new Promise((resolve, reject) => {
        let pack_data;
        if (fileExists(`${currentDirectory}/packfiles/${pack_url}/metadata.json`)) {
            pack_data = JSON.parse(fs.readFileSync(`${currentDirectory}/packfiles/${pack_url}/metadata.json`, 'utf8'));
        } else {
            pack_data = [];
            console.warn("[getPackMetaData] No metadata.json found for pack: " + pack_url);
        }
        resolve(pack_data);
    })
}

function checkForValidDDPath() {
    if (!fileExists(getDBDPathSync() + '/DeadByDaylight.exe')) {
        const path = getDBDPathSync();

        if (path == '') {
            dialog.showErrorBox("No game path", `Please set your Dead by Daylight installation path in the options.`);
            return false;
        }

        dialog.showErrorBox("Invalid game path", `The path (${path}) set is invalid. Please verify your Dead by Daylight installation path in the options.`);
        return false;
    }
    return true;
}

module.exports = {
    deletePack,
    downloadPack,
    activatePack,
    deactivatePack,
    resetAllPacks,
    getInstalledPacks,
    getActivePacks,
    getPackMetaData
}