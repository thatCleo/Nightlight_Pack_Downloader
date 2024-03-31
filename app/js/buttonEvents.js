const webviewPage = document.getElementById('webview-container-page');
const managePacksPage = document.getElementById('manage-packs-page');
const optionsPage = document.getElementById('options-page');

let packs_per_page = 6;

document.addEventListener('DOMContentLoaded', function () {
    console.log('adding event listener: click');
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('download-pack')) {
            const value = event.target.value;
            console.log('Button clicked:', value);
            downloadPack(value, event.target);
        }
    });
    console.log('adding event listener: change');
    document.addEventListener('change', function (event) {
        if (event.target.id = "packs_per_page") {
            const value = event.target.value;
            console.log('Per page changed:', value);
            packs_per_page = value;
            createPackTiles(1, value, 'downloads', '', 'any');
        }
    });
});

document.getElementById("options").addEventListener("click", () => {
    console.log("Options button clicked");
    const value = document.getElementById("options").value;
    downloadPack(value);
});

document.getElementById("nightlight").addEventListener("click", () => {
    webviewPage.style.display = "block";
    managePacksPage.style.display = "none";
    optionsPage.style.display = "none";
});

document.getElementById("manage-packs").addEventListener("click", () => {
    webviewPage.style.display = "none";
    managePacksPage.style.display = "block";
    optionsPage.style.display = "none";
});

document.getElementById("options-button").addEventListener("click", () => {
    webviewPage.style.display = "none";
    managePacksPage.style.display = "none";
    optionsPage.style.display = "block";
});