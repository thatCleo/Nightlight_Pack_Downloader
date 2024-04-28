function createPackTiles_Manage() {
  window.packFunctions.getInstalledPacks()
    .then(data => {
      let installed_packs = data;
      console.log("Creating Pack Tiles for Manage Packs...");
      console.log(installed_packs);
      setPackTiles_Manage(installed_packs);
    });
}

function setPackTiles_Manage(packs) {

  const manage_pack_view = document.getElementById('manage_packs_main_content');
  manage_pack_view.innerHTML = '';

  packs.forEach(pack_url => {

    console.log(`Added tile for installed pack ${pack_url}`);

    let pack_data;
    window.packFunctions.getPackMetaData(pack_url)
      .then(data => {
        pack_data = data;
        let avatar_elemets = '<div class="_1he3xh8">';
        pack_data.user.forEach(creator => {

          const creatorAvatar = `${window.directory.currentPath()}/packfiles/${pack_url}/${creator.user_id}_avatar.png`;
          const creatorName = creator.username;

          if (creator.user_id != null) {
            avatar_elemets += `<span class="d-flex align-items-center"><img id="pack-avatar-${pack_data.url}-${creator.user_id}" src="${creatorAvatar}" alt="${creatorName}" class="avatar">${creatorName}</span>`;
          } else {
            avatar_elemets += `<span class="d-flex align-items-center"><img id="pack-avatar-${pack_data.url}-null" class="avatar">${creatorName}</span>`;
          }
        });
        avatar_elemets += '</div>';

        let dbdVersionTitle = pack_data.dbd_version; // pack.dbd_version;
        const packLastUpdated = `${formatRelativeTime(pack_data.last_updated)} Days Ago`;; // `${formatRelativeTime(pack.updated_at)} Days Ago`;

        let packContent = "";
        for (let i = 0; i < pack_data.has.length; i++) {
          if (packContent == "")
            packContent += `${formatText(pack_data.has[i])}`;
          else
            packContent += `, ${formatText(pack_data.has[i])}`
        }

        const tile =
          `
          <div id="pack-banner-${pack_data.url}-manage" class="_1he3xh0"><img src="${window.directory.currentPath()}/packfiles/${pack_data.url}/banner.png"
              loading="lazy" alt="Pack Banner for ${pack_data.url}" class="_1he3xh1">
            <div class="_1he3xh5">
              <span class="_1he3xh6">${pack_data.title}</span>
              <div class="_1he3xh7 badge bg-secondary">v${pack_data.version}</div>
            </div>
            <div class="_1he3xh4">
              <div class="_1he3xhc">
                <div class="_15ryw142 _15ryw140 end-0 position-absolute"></div>
              </div>
              ${avatar_elemets}
              <div class="_1he3xha manage_pack_tile"><span><svg focusable="false" data-prefix="fas" data-icon="code-branch" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-code-branch">
                    <path fill="currentColor"
                      d="M80 104c13.3 0 24-10.7 24-24s-10.7-24-24-24S56 66.7 56 80s10.7 24 24 24zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24zM80 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z">
                    </path>
                  </svg> ${dbdVersionTitle}</span>
                  
                  <span><svg focusable="false" data-prefix="fas" data-icon="cloud-arrow-down"
                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
                    class="svg-inline--fa fa-cloud-arrow-down">
                    <path fill="currentColor"
                      d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z">
                    </path>
                  </svg>${pack_data.downloaded_at}</span></div>
              <div title="${packContent}" class="_1he3xhb"><svg focusable="false" data-prefix="fas" data-icon="box-open" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-box-open">
                  <path fill="currentColor"
                    d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128h2.2z">
                  </path>
                </svg>${packContent}</div>
                <div class="flex-manage-buttons">
                <button value="${pack_data.url}" class="manage-buttons manage-delete-button delete-pack btn btn-sm w-100 d-block">Delete Pack</button><button value="${pack_data.url}" class="manage-buttons toggle-pack btn btn-sm w-100 d-block">Activate Pack</button>
                </div>
              </div>
          </div>
        `;

        const packTile = document.createElement('div');
        packTile.innerHTML = tile;

        window.packFunctions.getActivePacks()
          .then((result) => {
            if (result.includes(pack_data.url)) {
              console.log(`Pack ${pack_data.url} is active`);
              const button = packTile.getElementsByClassName('toggle-pack')[0];
              button.classList.add('manage-button-pack-active');
              button.innerText = 'Pack Active';
            } else {
              console.log(`Pack ${pack_data.url} is not active`);
            }
          })

        manage_pack_view.appendChild(packTile);
        console.log(`Added tile for ${pack_data.url}`);
      });
  });
}