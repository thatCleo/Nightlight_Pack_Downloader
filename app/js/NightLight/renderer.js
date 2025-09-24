const information = document.getElementById("info");
information.innerText = `App (v${versions.app()})\nChrome (v${versions.chrome()})\nNode.js (v${versions.node()})\nElectron (v${versions.electron()})`;

/* Nightlight Page Setup */
const webview = document.getElementById("webview-container-page");
webview.style.display = "block";

function startRendering() {
  setWebEmbed();

  /* Manage Packs Page Setup */
  // removeManageNavigation();
  createPackTiles_Manage();
  createPackOrderTiles_Manage();
  checkForUpdates();

  /* Options Page Setup */
  setOptionValuesToElements();
}

function setWebEmbed() {
  fixStyling();

  addFilters();
  addNavigation();

  loadPackTiles();
}

function loadPackTiles() {
  console.log("Loading Pack Tiles...");
  createPackTiles(
    current_page,
    packs_per_page,
    sort_by,
    search,
    author,
    dbd_version,
    includes,
    include_mode,
  );
}

function createPackTiles(
  page,
  per_page,
  sort_by,
  search,
  author,
  dbd_version,
  includes,
  include_mode,
) {
  console.log("Creating Pack Tiles...");
  if (page <= 0) {
    page = 1;
  }
  if (author != "") {
    author = `&author=${author}`;
  }
  if (search != "") {
    search = `&search=${search}`;
  }
  if (dbd_version != "") {
    dbd_version = `&version=${dbd_version}`;
  }

  console.log(`${search}, ${dbd_version}`);

  window.webFunctions
    .httpGet(
      `https://nightlight.gg/api/v1/packs?page=${page}&per_page=${per_page}&sort_by=${sort_by}${author}${search}${dbd_version}&includes=${includes}&include_mode=${include_mode}`,
    )
    .then((data) => {
      setPackTiles(data);
    });
}

async function showNotification(text, time, id, autohide = true) {
  const notification = document.createElement("notification");
  notification.id = `notification-${id}`;
  notification.innerText = text;

  const notification_container = document.getElementById(
    "notification-container",
  );
  notification_container.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 50); // Some delay to keep the flying up animation

  if (autohide) {
    setTimeout(() => {
      notification.classList.remove("show");

      setTimeout(() => {
        // Wait for the notification to be removed
        notification.remove();
      }, 125);
    }, time);
  }
}

async function editNotification(text, id, add_text = false, time = -1) {
  const notification = document.getElementById(`notification-${id}`);
  if (add_text) {
    notification.innerText += text;
    return;
  }
  notification.innerText = text;

  console.log(`${id}, ${text}, ${time}`);
  if (time >= 0) {
    console.log(`autohide ${id} after ${time}ms`);
    setTimeout(() => {
      notification.classList.remove("show");

      setTimeout(() => {
        // Wait for the notification to be removed
        notification.remove();
      }, 125);
    }, time);
  }
}

async function hideNotification(id, delay = 0) {
  const notification = document.getElementById(`notification-${id}`);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      // Wait for the notification to be removed
      notification.remove();
    }, 125);
  }, delay);
}
