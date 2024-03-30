const information = document.getElementById('info');
information.innerText = `Chrome (v${versions.chrome()})\nNode.js (v${versions.node()})\nElectron (v${versions.electron()})`;

httpGet('https://nightlight.gg/packs', setWebEmbed);


function setWebEmbed(string, status) {
    const webview = document.getElementById('webview-container');
    webview.innerHTML = string;

    removeNavigation();
}

function createPackTiles(page, per_page, sort_by, includes, include_mode) {
    httpGet(`https://nightlight.gg/api/v1/packs?page=${page}&per_page=${per_page}&sort_by=${sort_by}&includes=${includes}&include_mode=${include_mode}`, setPackTiles);
}

function setPackTiles(json) {
    
}

function httpGet(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true);
    // xmlHttp.setRequestHeader(`Content-Security-Policy`, `default-src 'self'; connect-src 'self' ${url};`);
    xmlHttp.setRequestHeader(`Content-Security-Policy`, `connect-src 'https://nightlight.gg/*';`);

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        else
            callback(`Request failed:\nreadystate = ${xmlHttp.readyState}\ntype: ${xmlHttp.responseType}\nmessage: ${xmlHttp.statusText}\nurl: ${url}\nresponse: ${xmlHttp.responseText}`, xmlHttp.status);
    };

    xmlHttp.send(null);
}