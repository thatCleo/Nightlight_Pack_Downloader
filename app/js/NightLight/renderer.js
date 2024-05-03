const information = document.getElementById('info');
information.innerText = `Chrome (v${versions.chrome()})\nNode.js (v${versions.node()})\nElectron (v${versions.electron()})`;
setWebEmbed();

function setWebEmbed() {
    fixStyling();

    addFilters();
    addNavigation();

    loadPackTiles();
}

function loadPackTiles() {
    console.log("Loading Pack Tiles...");
    
    let include_mode = 'any';
    if(includes != '') {
        include_mode = 'only';
    }

    createPackTiles(current_page, packs_per_page, sort_by, search, author, dbd_version, includes, include_mode);
}

function createPackTiles(page, per_page, sort_by, search, author, dbd_version, includes, include_mode) {
    console.log("Creating Pack Tiles...")
    if (author != '') {
        author = `&author=${author}`;
    }
    if (search != '') {
        search = `&search=${search}`;
    }
    if (dbd_version != '') {
        dbd_version = `&version=${dbd_version}`
    }

    window.webFunctions.httpGet(`https://nightlight.gg/api/v1/packs?page=${page}&per_page=${per_page}&sort_by=${sort_by}${author}${search}${dbd_version}&includes=${includes}&include_mode=${include_mode}`)
        .then(data => {
            setPackTiles(data);
        })
}