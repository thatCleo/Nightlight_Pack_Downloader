const webviewPage = document.getElementById('webview-container-page');
const managePacksPage = document.getElementById('manage-packs-page');
const optionsPage = document.getElementById('options-page');

let buttons = document.getElementsByClassName("button_page_nav");

let packs_per_page = 12;
let current_page = 1;
let total_pages = -1;
let total_packs = -1;

/* Filter varaibles */
let sort_by_default;
let sort_by = sort_by_default = 'downloads';

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('download-pack')) {
            const value = event.target.value;
            downloadPack(value, event.target);
        }

        else if (event.target.id.includes('button_page_nav')) {
            console.log(`Prev Page: ${current_page}`);
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

            console.log(`Page: ${current_page}`);

            createPackTiles(current_page, packs_per_page, 'downloads', '', 'any');
            scrollToTop();
        }

        else if (event.target.id.includes('button_filter_reset')) {
            disableFilterResetButton();
            sort_by = sort_by_default;
            document.getElementById('filter_sort_by').value = sort_by_default;
        }
    });
    document.addEventListener('change', function (event) {
        if (event.target.id == "packs_per_page") {
            const value = event.target.value;
            packs_per_page = value;

            if(current_page > getTotalPageNum(value, total_packs)) {
                current_page = getTotalPageNum(value, total_packs);
            }
            createPackTiles(current_page, packs_per_page, 'downloads', '', 'any');
        }

        else if (event.target.id == "input_page_nav") {
            const value = event.target.value;
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

            createPackTiles(current_page, packs_per_page, sort_by, '', 'any');
            scrollToTop();
        }

        else if (event.target.id == "filter_sort_by") {
            enableFilterResetButton();
            const value = event.target.value;
            sort_by = value;
            createPackTiles(current_page, packs_per_page, sort_by, '', 'any');
        }
    });
});

document.getElementById("options").addEventListener("click", () => {
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
}

function disablePageNavButtonsNext() {
    buttons[2].disabled = true;
    buttons[3].disabled = true;
}

function enablePageNavButtons() {
    buttons[0].disabled = false;
    buttons[1].disabled = false;
    buttons[2].disabled = false;
    buttons[3].disabled = false;
}

function disableFilterResetButton() {
    console.log('Filter reset button disabled');
    const button = document.getElementById('button_filter_reset');
    button.className = button.className.replace("disabled", "");
}

function enableFilterResetButton() {
    console.log('Filter reset button enabled');
    const button = document.getElementById('button_filter_reset');
    button.className += "disabled";
}

function scrollToTop() {
    webviewPage.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}