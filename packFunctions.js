const { downloadFile } = require('./webFunctions');
const { fileExists, copyFile, unzipFile } = require('./fileFunctions');
const fs = require('fs');

let dbd_game_path = '/home/micki/.var/app/com.valvesoftware.Steam/.local/share/Steam/steamapps/common/Dead by Daylight' + '/DeadByDaylight/Content/UI/Icons/';
dbd_game_path = __dirname + '/dbd_game_example/';

async function deletePack(event, pack_url) {
    console.log(`Deleting ${pack_url}`);

    getInstalledPacks()
    .then(data => {
        let installed_packs = data;
        for (let i = 0; i < installed_packs.length; i++) {
            if (installed_packs[i] == pack_url) {
                installed_packs.splice(i, 1);
                break;
            }
        }
    
        const path = `${__dirname}/packfiles/${pack_url}`;
    
        fs.rm(path, { recursive: true }, (err) => {
            if (err) {
                console.error('Error deleting folder:', err);
            } else {
                console.log('Folder deleted successfully');
            }
        });
    
        const json_string = {
            "installedPacks": installed_packs
        }
        fs.writeFileSync(`${__dirname}/packfiles/installedPacks.json`, JSON.stringify(json_string));
    })
}

async function downloadPack(event, url, packData) {
    return new Promise((resolve, reject) => {

        console.log(`Downloading pack: ${url}`);
        const download_url = `https://nightlight.gg/packs/${url}/download`;
        const directory_path = `${__dirname}/packfiles/${url}`;
        const file_name = `${url}.zip`
        downloadFile(event, download_url, directory_path, file_name)
            .then(() => {

                getInstalledPacks()
                    .then((installed_packs) => {
                        console.log(`Installed packs: ${installed_packs}`);
                if (!installed_packs.includes(url)) {
                    installed_packs.push(url);
                }
                const json_string = {
                    "installedPacks": installed_packs
                }
                fs.writeFileSync(`${__dirname}/packfiles/installedPacks.json`, JSON.stringify(json_string));

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

                                let creatorAvatar = `${__dirname}/cached_images/placeholder/avatar.png`;
                                if (fileExists(`${__dirname}/cached_images/${creator.user.user_id}_${creator.user.avatar_id}/avatar.png`)) {
                                    creatorAvatar = `${__dirname}/cached_images/${creator.user.user_id}_${creator.user.avatar_id}/avatar.png`;
                                }
                                fs.copyFile(`${creatorAvatar}`, `${directory_path}/${creator.user.user_id}_avatar.png`, (err) => {
                                    console.log(`Copied ${creatorAvatar} to ${directory_path}/${creator.user.user_id}_avatar.png`);
                                    if (err) {
                                        console.warn("Error copying file:", err);
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

                const cachePath = `${__dirname}/cached_images/${id}_${current_version}`;
                fs.copyFile(`${cachePath}/banner.png`, `${directory_path}/banner.png`, (err) => {
                    if (err) {
                        console.warn("Error copying file:", err);
                    } else {
                        console.log(`Copied ${cachePath}/banner.png to ${directory_path}/banner.png`);
                    }
                })
                console.log(`Pack ${url} downloaded successfully`);
                resolve(url);
                    })
            });
    })
}

async function activatePack(event, url) {
    const zipPath = `${__dirname}/packfiles/${url}/${url}.zip`;
    const targetPath = `${__dirname}/temp/${url}/`;
    unzipFile(zipPath, targetPath)
    .then(() => {
        copyFile(targetPath, dbd_game_path);  
    });
}

function getInstalledPacks() {
    console.log("Getting installed packs...");
    return new Promise((resolve, reject) => {
        let installed_packs;
        if (fileExists(`${__dirname}/packfiles/installedPacks.json`)) {
            installed_packs = JSON.parse(fs.readFileSync(`${__dirname}/packfiles/installedPacks.json`, 'utf8')).installedPacks;
        } else {
            installed_packs = [];
        }
        resolve(installed_packs);
    })
}

function getPackMetaData(event, pack_url) {
    return new Promise((resolve, reject) => {
        let pack_data;
        if (fileExists(`${__dirname}/packfiles/${pack_url}/metadata.json`)) {
            pack_data = JSON.parse(fs.readFileSync(`${__dirname}/packfiles/${pack_url}/metadata.json`, 'utf8'));
        } else {
            pack_data = [];
            console.warn("No metadata.json found for pack: " + pack_url);
        }
        resolve(pack_data);
    })
}

module.exports = {
    deletePack,
    downloadPack,
    activatePack,
    getInstalledPacks,
    getPackMetaData
}