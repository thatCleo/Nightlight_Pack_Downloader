function fixStyling() {
  const mainContainer = document.getElementsByClassName("main");
  if (mainContainer.length > 0) {
    mainContainer[0].style.marginLeft = "0px";
  }

  const filter_form = document.getElementsByClassName("row");
  for (let i = 0; i < filter_form.length; i++) {
    if (i == 1) {
      filter_form[i].id = `row_${i}`;
    }
  }

  const main = document.getElementById("main");
  if (main != null) {
    main.style.marginLeft = "0px";
    main.style.marginRight = "20px";
    main.style.marginTop = "20px";
  }
}

function addFilters() {
  const filter_sort_by = document.getElementById("filter_sort_by");
  const options_sort_by = `
    <option value="title">Name</option>
    <option value="downloads">Downloads</option>
    <option value="updated">Last Updated</option>
    <option value="created">Creation Date</option>
    <option value="dbd_version">Game Version</option>
    <option value="random">Random</option>
    `;

  filter_sort_by.innerHTML = options_sort_by;
  filter_sort_by.value = "downloads";

  window.webFunctions
    .httpGet("https://nightlight.gg/api/v1/packs/authors") // Setting authors as options for filtering
    .then((result) => {
      setFilterAuthors(result);
    });

  const filter_dbd_version = document.getElementById("filter_dbd_version");
  let options_dbd_version = '<option value=""></option>';

  dbd_version_title.forEach((version) => {
    options_dbd_version += `<option value="${version[0]}">${version[0]} ${version[1]}</option>`;
  });

  filter_dbd_version.innerHTML = options_dbd_version;
  filter_dbd_version.value = "";
}

function setFilterAuthors(data) {
  if (data == null || data == "[]") {
    return;
  }

  const allData = JSON.parse(data);
  const authors = allData.data;

  const filter_authors = document.getElementById("sort_by_author");

  let options_authors = '<option value=""></option>';

  authors.forEach((author) => {
    options_authors += `<option value="${author.id}">${author.name}</option>`;
  });

  filter_authors.innerHTML = options_authors;
  filter_authors.id = "filter_authors";
}

function addNavigation() {
  const buttons = document.getElementsByClassName("btn-secondary");

  for (let i = 0; i < buttons.length; i++) {
    if (i == 0) {
      buttons[i].id += "button_filter_reset";
    }
    if (i >= 4) {
      buttons[i].id = `button_page_nav button_page_nav_${i - 4}`;
      buttons[i].className += " button_page_nav";
    }
  }
}

document.getElementById("browse-per-page").value = "12"; // Set the default value of the Per Page dropdown
