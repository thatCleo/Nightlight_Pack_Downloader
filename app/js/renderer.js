const information = document.getElementById('info');
information.innerText = `Chrome (v${versions.chrome()})\nNode.js (v${versions.node()})\nElectron (v${versions.electron()})`;

httpGet('https://nightlight.gg/packs', setWebEmbed);
//downloadPack('faerys-galaxy-pack');


function setWebEmbed(string, status) {
    console.log("Embedding webpage...");
    const webview = document.getElementById('webview-container-page');
    webview.style.display = "block";
    webview.innerHTML = string;

    removeNavigation();
    addNavigation();
    createPackTiles(1, 12, 'downloads', '', 'any');
}



function createPackTiles(page, per_page, sort_by, includes, include_mode) {
    console.log("Creating Pack Tiles...")
    httpGet(`https://nightlight.gg/api/v1/packs?page=${page}&per_page=${per_page}&sort_by=${sort_by}&includes=${includes}&include_mode=${include_mode}`, setPackTiles);
}

let addedTiles = false;