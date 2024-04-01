function deletePack(pack_url) {
    console.log(`Deleting ${pack_url}`);

    for (let i = 0; i < installed_packs.length; i++) {
        if (installed_packs[i] == pack_url) {
            installed_packs.splice(i, 1);
            break;
        }
    }

    const path = `${directory.currentPath()}/packfiles/${pack_url}`;

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
    fs.writeFileSync(`${directory.currentPath()}/packfiles/installedPacks.json`, JSON.stringify(json_string));

    createPackTiles_Manage();
}