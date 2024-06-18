function createPackTiles_Manage() {
  const manage_pack_view = document.getElementById('manage-pack-tiles');
  manage_pack_view.innerHTML = '';

  window.packFunctions.getInstalledPacks()
    .then(data => {
      let installed_packs = data;
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

        let dbdVersionTitle = pack_data.dbd_version;
        for (let i = 0; i < dbd_version_title.length; i++) {
          if (dbd_version_title[i][0] == dbdVersionTitle) {
            dbdVersionTitle = dbd_version_title[i][1];
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
            <button class="manage-pack-tile-delete delete-pack" value="${pack_data.url}" title="Delete ${pack_data.title}">🗑</button>
            <button class="manage-pack-tile-update" id="update-${pack_data.url}" title="Download newest version again">↻</button>
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
                class="manage-pack-tile-game-version-svg svg-inline--fa fa-code-branch">
                <path fill="currentColor"
                  d="M80 104c13.3 0 24-10.7 24-24s-10.7-24-24-24S56 66.7 56 80s10.7 24 24 24zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24zM80 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z">
                </path>
              </svg>
              <p class="manage-pack-tile-game-version">${dbdVersionTitle}</p>
            </div>
            <div class="manage-pack-tile-content-container">
              <svg class="manage-pack-tile-content-svg" focusable="false" data-prefix="fas" data-icon="box-open"
                            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="18px" height="18px"
                            class="svg-inline--fa fa-box-open">
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