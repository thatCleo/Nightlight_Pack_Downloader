const webviewPage = document.getElementById('webview-container-page');
const managePacksPage = document.getElementById('manage-packs-page');
const optionsPage = document.getElementById('options-page');

let buttons = document.getElementsByClassName("button_page_nav");

let packs_per_page = 6;
let current_page = 1;
let total_pages = -1;
let total_packs = -1;

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('download-pack')) {
            const value = event.target.value;
            console.log('Button clicked:', value);
            downloadPack(value, event.target);
        }

        if (event.target.id.includes('button_page_nav')) {
            if (event.target.id.includes('button_page_nav_0')) { // First page Button
                current_page = 1;
                enablePageNavButtons();
                disablePageNavButtonsPrev();
            }
            else if (event.target.id.includes('button_page_nav_1')) { // Previous Page Button
                current_page--;
                if (current_page <= 1) {
                    disablePageNavButtonsPrev();
                } else {
                    enablePageNavButtons();
                }
            }
            else if (event.target.id.includes('button_page_nav_2')) { // Next Page Button
                if (current_page < total_pages) {
                    current_page++;
                }
                if (current_page >= total_pages) {
                    disablePageNavButtonsNext();
                }
                else {
                    enablePageNavButtons();
                }
            }
            else if (event.target.id.includes('button_page_nav_3')) { // Last Page Button
                current_page = total_pages;
                enablePageNavButtons();
                disablePageNavButtonsNext();
            }

            console.log(`page ${current_page} of ${total_pages}`);
            createPackTiles(current_page, packs_per_page, 'downloads', '', 'any');
        }
    });
    document.addEventListener('change', function (event) {
        if (event.target.id == "packs_per_page") {
            const value = event.target.value;
            console.log('Per page changed:', value);
            packs_per_page = value;

            if(current_page > getTotalPageNum(value, total_packs)) {
                current_page = getTotalPageNum(value, total_packs);
            }

            console.log(`Element: ${event.target.id}`);

            createPackTiles(current_page, packs_per_page, 'downloads', '', 'any');
        }
        else if (event.target.id == "input_page_nav") {
            const value = event.target.value;
            console.log('Page changed:', value);
            current_page = value;

            if(current_page <= 1) {
                current_page = 1;
            }
            if (current_page >= total_pages) {
                current_page = total_pages;
            }

            enablePageNavButtons();
            if(current_page == 1) {
                disablePageNavButtonsPrev();
            }
            if(current_page == total_pages) {
                disablePageNavButtonsNext();
            }

            createPackTiles(current_page, packs_per_page, 'downloads', '', 'any');
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

function disablePageNavButtonsPrev() {
    buttons[0].disabled = true;
    buttons[1].disabled = true;

    console.log("Disabled prev button");
}

function disablePageNavButtonsNext() {
    buttons[2].disabled = true;
    buttons[3].disabled = true;

    console.log("Disabled next button");
}

function enablePageNavButtons() {
    buttons[0].disabled = false;
    buttons[1].disabled = false;
    buttons[2].disabled = false;
    buttons[3].disabled = false;

    console.log("Enabled all buttons");
}