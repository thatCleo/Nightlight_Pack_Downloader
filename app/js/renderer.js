const information = document.getElementById('info');
information.innerText = `Chrome (v${versions.chrome()})\nNode.js (v${versions.node()})\nElectron (v${versions.electron()})`;

httpGet('https://nightlight.gg/packs', setWebEmbed);

function setWebEmbed(string, status) {
    console.log("Embedding webpage...");
    const webview = document.getElementById('webview-container-page');
    webview.style.display = "block";
    webview.innerHTML = string;

    removeNavigation();
    addFilters();
    addNavigation();

    loadPackTiles();
}

function loadPackTiles() {
    createPackTiles(current_page, packs_per_page, sort_by, author, search, '', 'any');
}

function createPackTiles(page, per_page, sort_by, author, search, includes, include_mode) {
    console.log("Creating Pack Tiles...")
    if(author != '') {
        author = `&author=${author}`;
    }
    if(search != '') {
        search = `&search=${search}`;
    }

    httpGet(`https://nightlight.gg/api/v1/packs?page=${page}&per_page=${per_page}&sort_by=${sort_by}${author}${search}&includes=${includes}&include_mode=${include_mode}`, setPackTiles);
}

let addedTiles = false;