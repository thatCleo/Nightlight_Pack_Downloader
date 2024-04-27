function fixStyling() {
    const mainContainer = document.getElementsByClassName('main');
    if (mainContainer.length > 0) {
        mainContainer[0].style.marginLeft = "0px";
    }

    const filter_form = document.getElementsByClassName('row');
    for(let i = 0; i < filter_form.length; i++) {
        if(i == 1) {
            filter_form[i].id = `row_${i}`;
        }
    }

    const main = document.getElementById('main');
    if (main != null) {
        main.style.marginLeft = "0px";
        main.style.marginRight = "20px";
        main.style.marginTop = "20px";
    }
}

function addFilters() {
    const filter_apply = document.getElementsByClassName('lh-1');
    filter_apply[0].id = "button_filter_apply";
    filter_apply[1].id = "button_filter_reload";

    const filter_sort_by = document.getElementById('filter_sort_by');
    const options_sort_by = `
    <option value="title">Name</option>
    <option value="downloads">Downloads</option>
    <option value="updated">Last Updated</option>
    <option value="created">Creation Date</option>
    <option value="dbd_version">Game Version</option>
    <option value="random">Random</option>
    `

    filter_sort_by.innerHTML = options_sort_by;
    filter_sort_by.id = "filter_sort_by";
    filter_sort_by.value = "downloads";

    window.webFunctions.httpGet('https://nightlight.gg/api/v1/packs/authors') // Setting authors as options for filtering
    .then((result) => {
        setFilterAuthors(result);        
    });
}

function setFilterAuthors(data) {
    if(data == null || data == '[]') {
        return;
    }

    const allData = JSON.parse(data);
    const authors = allData.data;

    const filter_authors = document.getElementById('sort_by_author');

    let options_authors = '<option value=""></option>';

    authors.forEach(author => {
        options_authors += `<option value="${author.id}">${author.name}</option>`
    });

    filter_authors.innerHTML = options_authors;
    filter_authors.id = "filter_authors";
}

function addNavigation() {
    let per_page = document.getElementsByClassName('d-md-inline');
    if (per_page.length == 2) {
        const child = per_page[0].parentElement.childNodes;
        per_page = child[1];

        const options = `
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="18">18</option>
        <option value="24">24</option>`;

        per_page.innerHTML = options;
        per_page.id += "packs_per_page";
        per_page.value = 12;
    }

    const buttons = document.getElementsByClassName("btn-secondary")

    for (let i = 0; i < buttons.length; i++) {
        if (i == 0) {
            buttons[i].id += 'button_filter_reset';
        }
        if (i >= 4) {
            buttons[i].id = `button_page_nav button_page_nav_${i - 4}`;
            buttons[i].className += " button_page_nav";
            buttons[i].childNodes[0].id += `button_page_nav button_page_nav_${i - 4}`
            buttons[i].childNodes[0].childNodes[0].id += `button_page_nav button_page_nav_${i - 4}`
        }
    }
}