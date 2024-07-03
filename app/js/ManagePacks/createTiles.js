function createPackTiles_Manage() {
  const manage_pack_view = document.getElementById('manage-pack-tiles');
  manage_pack_view.innerHTML = '';

  window.packFunctions.getInstalledPacks()
    .then(data => {
      const installed_packs = data;
      console.log("Creating Pack Tiles for Manage Packs...");
      console.log(installed_packs);
      setPackTiles_Manage(installed_packs);
    });
}

function setPackTiles_Manage(packs) {

  const manage_pack_view = document.getElementById('manage-pack-tiles');

  packs.forEach(pack_url => {

    let pack_data;
    window.packFunctions.getPackMetaData(pack_url)
      .then(data => {
        pack_data = data;

        let dbd_version_title_tile = pack_data.dbd_version;
        for (let i = 0; i < dbd_version_title.length; i++) {
          if (dbd_version_title[i][0] == dbd_version_title_tile) {
            dbd_version_title_tile = dbd_version_title[i][1];
            break;
          }
        }

        let packContent = "";
        for (let i = 0; i < pack_data.has.length; i++) {
          if (packContent == "")
            packContent += `${formatText(pack_data.has[i])}`;
          else
            packContent += `, ${formatText(pack_data.has[i])}`
        }

        const tile = `
          <div class="manage-pack-tile toggle-pack" id="manage-tile-${pack_data.url}">
            <button class="manage-pack-tile-update hidden" id="update-${pack_data.url}" title="Update: ${pack_data.title}">↻</button>
            <button class="manage-pack-tile-delete delete-pack" value="${pack_data.url}" title="Delete: ${pack_data.title}">
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#f2f2f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="manage-pack-tile-image-container">
              <img class="manage-pack-tile-image" src="${window.directory.currentPath()}/packfiles/${pack_data.url}/banner.png" alt="Pack Banner for ${pack_data.url}">
            </div>
            <div class="manage-pack-tile-info-container">
              <p class="manage-pack-tile-name">${pack_data.title}</p>
              <div class="manage-pack-tile-pack-version-container">
                <p class="manage-pack-tile-pack-version">v${pack_data.version}</p>
              </div>
              <svg focusable="false" data-prefix="fas" data-icon="code-branch" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                class="manage-pack-tile-game-version-svg svg-inline">
                <path fill="currentColor"
                  d="M80 104c13.3 0 24-10.7 24-24s-10.7-24-24-24S56 66.7 56 80s10.7 24 24 24zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24zM80 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z">
                </path>
              </svg>
              <p class="manage-pack-tile-game-version">${dbd_version_title_tile}</p>
            </div>
            <div class="manage-pack-tile-content-container">
              <svg class="manage-pack-tile-content-svg" focusable="false" data-prefix="fas" data-icon="box-open"
                            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="18px" height="18px"
                            class="svg-inline">
                            <path fill="currentColor"
                            d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128h2.2z">
                            </path>
                        </svg>
              <p class="manage-pack-tile-content">${packContent}</p>
            </div>
          </div>`

        const packTile = document.createElement('div');
        packTile.innerHTML = tile;
        packTile.classList.add('manage-pack-tile-container')

        window.packFunctions.getActivePacks()
          .then((result) => {
            if (result.includes(pack_data.url)) {
              console.log(`Pack ${pack_data.url} is active`);
              const button = packTile.getElementsByClassName('manage-pack-tile')[0];
              button.classList.add('manage-pack-tile-pack-active');
            } else {
              console.log(`Pack ${pack_data.url} is not active`);
            }
          })

        manage_pack_view.appendChild(packTile);
        console.log(`Added tile for ${pack_data.url}`);
      });
  });
}

let is_checking_for_pack_updates = false;

async function checkForPackUpdates() {
  if (is_checking_for_pack_updates) return;

  is_checking_for_pack_updates = true;

  notification_popup.innerText = 'Checking for Pack Updates';
  notification_popup.classList.add('show');

  const installed_packs = await window.packFunctions.getInstalledPacks();
  const check_delay = 250; // 250ms to not throw to many requests at the server simultaneously
  const updates_found_count = 0;

  if (installed_packs.length > 0) {
    checkForPackUpdatesDelayed(installed_packs, 0, check_delay, updates_found_count);
  }
}

function checkForPackUpdatesDelayed(installed_packs, index, delay, updates_found_count) {

  if(index % 3 == 0) {
    notification_popup.innerText = 'Checking for Pack Updates.';
  } else {
    notification_popup.innerText += '.';
  }
  

  const pack_url = installed_packs[index];
  window.webFunctions.httpGet(`https://nightlight.gg/api/v1/packs?page=1&per_page=1&sort_by=downloads&search=${pack_url}`)
    .then((pack_data) => {
      pack_data = JSON.parse(pack_data);
      window.packFunctions.getPackMetaData(pack_url)
        .then((current_pack_data) => {
          if (pack_data.data.packs[0].updated_at != current_pack_data.last_updated) {
            document.getElementById(`update-${pack_url}`).classList.remove('hidden');
            updates_found_count++;
          }

          if (index + 1 < installed_packs.length) {
            setTimeout(() => {
              checkForPackUpdatesDelayed(installed_packs, index + 1, delay, updates_found_count)
            }, delay);
          } else {
            notification_popup.classList.remove('show');
            setTimeout(() => {
              notification_popup.innerText = `Found ${updates_found_count} Update${(updates_found_count == 1 ? '' : 's')}`
              notification_popup.classList.add('show');
              setTimeout(() => {
                notification_popup.classList.remove('show');
                is_checking_for_pack_updates = false;
              }, 2500);
            }, 125);
          }
        })
    })
}