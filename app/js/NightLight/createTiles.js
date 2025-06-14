let navPageInfo;
let packData;
let variants_data;

const dbd_version_title = [
  ["9.0.0", "Five Nights at Freddy's"],
  ["8.7.0", "Steady Pulse"],
  ["8.6.0", "Tokyo Ghoul"],
  ["8.4.0", "Doomed Course"],
  ["8.3.0", "Mid-Chapter"],
  ["8.2.0", "Castlevania"],
  ["8.1.0", "Tomb Raider"],
  ["8.0.0", "Dungeons & Dragons"],
  ["7.6.0", "All Things Wicked"],
  ["7.5.0", "Alan Wake"],
  ["7.4.0", "Chucky"],
  ["7.2.0", "Alien"],
  ["7.1.0", "Nicolas Cage"],
  ["7.0.0", "End Transmission"],
  ["6.6.0", "Tools of Torment"],
  ["6.4.0", "Forged in Fog"],
  ["6.2.0", "Resident Evil: Project W"],
  ["6.0.0", "Roots of Dread"],
  ["5.6.0", "Sadako Rising"],
  ["5.4.0", "Portrait of a Murder"],
  ["5.3.0", "Hour of the Witch"],
  ["5.2.0", "Hellraiser"],
  ["5.0.0", "Resident Evil"],
  ["4.6.0", "All-Kill"],
  ["4.4.0", "A Binding of Kin"],
  ["4.2.0", "Descend Beyond"],
  ["4.0.0", "Silent Hill"],
  ["3.6.0", "Chains of Hate"],
  ["3.4.0", "Cursed Legacy"],
  ["3.0.0", "Ghost Face"],
  ["2.6.3", "Ash vs. Evil Dead"],
  ["2.6.0", "Demise of The Faithful"],
  ["2.4.0", "Darkness Among Us"],
  ["2.2.0", "Shattered Bloodline"],
  ["2.0.0", "Curtain Call"],
  ["1.9.0", "Saw"],
  ["1.8.0", "A Nightmare on Elm Street"],
  ["1.7.0", "Leatherface"],
  ["1.6.0", "A Lullaby for the Dark"],
  ["1.5.1", "Spark of Madness"],
  ["1.3.1", "Of Flesh and Mud"],
  ["1.2.1", "Halloween"],
  ["1.1.0", "The Last Breath"],
];

const supporter_icon = `<svg focusable="false" data-prefix="fas" data-icon="crown" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-crown gold supporter-icon"><path fill="currentColor" d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"></path></svg>`;

function setPackTiles(json) {
  const packview = document.getElementsByClassName('row-cols-1');
  if (packview.length == 0) {
    document.getElementById('info').innerText = `Error: packview.length = ${packview.length}`
    return;
  }

  packview[0].innerHTML = '';

  const allData = JSON.parse(json);
  packData = allData.data.packs;
  variants_data = allData.data.variants;

  total_packs = allData.data.total_packs;

  setNavElemets(packData.length, packs_per_page);

  const packs_with_variants = [];

  variants_data.forEach(variant => {

    downloadBanner(variant.id, variant.current_version);

    let pack_index = -1;

    for (let i = 0; i < packs_with_variants.length; i++) {
      if (packs_with_variants[i].indexOf(variant.primary_variant) != -1) {
        pack_index = i;
        break;
      }
    }

    if (pack_index == -1) {
      packs_with_variants.push([variant.primary_variant, new Array()]);
      pack_index = packs_with_variants.length - 1;
    }
    packs_with_variants[pack_index][1].push([variant.url, variant.variant_nickname]);
  })

  packData.forEach(pack => {

    downloadBanner(pack.id, pack.current_version);

    let variants = [];
    let pack_index = -1;
    let variants_template = '';

    for (let i = 0; i < packs_with_variants.length; i++) {
      if (packs_with_variants[i].indexOf(pack.id) != -1) {
        pack_index = i;
        break;
      }
    }

    if (pack_index != -1) {
      for (let i = 0; i < packs_with_variants[pack_index][1].length; i++) {
        const variant = document.createElement('div');
        variant.innerHTML = `<p id="variant-${packs_with_variants[pack_index][1][i][0]}" class="description_variant">${packs_with_variants[pack_index][1][i][1]}</p>`;
        variants.push(variant);
      }
    }

    const default_variant_index = Number((variants.length / 2).toString().split('.')[0]);

    const default_variant = document.createElement('div');
    default_variant.innerHTML = `<p id="variant-${pack.url}" class="description_variant">Default</p>`;
    variants.splice(default_variant_index, 0, default_variant);

    if (variants.length <= 1) {
      variants_template = `<div class="variants-${pack.id} container_varaiants ${default_variant_index}"></div>`;
      variants[default_variant_index].classList.add('active');
    }

    if (variants.length >= 2) {
      variants_template =
        `<div class="button_variant button_variant_prev">
        <svg focusable="false" data-prefix="far" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-left">
          <path fill="currentColor" d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z">
          </path>
        </svg>
      </div>
      <div class="variants-${pack.id} container_varaiants ${default_variant_index}"></div>
      <div class="button_variant button_variant_next">
        <svg focusable="false" data-prefix="far" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-left">
          <path fill="currentColor" d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z">
          </path>
        </svg>
      </div>`;

      variants[default_variant_index].childNodes[0].classList.add('description_variant_active');
      variants[default_variant_index].childNodes[0].classList.add('description_variant_visible');
      variants[default_variant_index].classList.add('active');

      variants[default_variant_index + 1].childNodes[0].classList.add('description_variant_visible');
    }

    if (variants.length >= 3) {
      variants[(default_variant_index - 1)].childNodes[0].classList.add('description_variant_visible');
    }

    // let avatar_elements = '<div class="_1he3xh8 pack_creator_avatars">';
    let avatar_elements = document.createElement('div');

    avatar_elements.classList.add('_1he3xh8');
    avatar_elements.classList.add('pack_creator_avatars');

    pack.creators.forEach(creator => {
      const creatorName = creator.username;
      let avatar_element = document.createElement('span');
      avatar_element.classList.add('d-flex');
      avatar_element.classList.add('align-items-center');

      if (creator.user != null) {
        console.log(`${pack.id}_${creator.user.user_id}`);
        avatar_element.innerHTML = `<img id="pack-avatar-${pack.id}-${creator.user.user_id}" src="${window.directory.currentPath()}/cached_images/${creator.user.user_id}_${creator.user.avatar_id}/avatar.png" alt="${creatorName}" class="avatar">${creatorName}`;

        if (creator.user.colour) {
          avatar_element.style.color = `#${creator.user.colour}`;
        }

        if (creator.user.is_supporter) {
          avatar_element.innerHTML += supporter_icon;
        }

        downloadAvatar(creator.user.user_id, creator.user.avatar_id, pack.id);
      } else {
        avatar_element.innerHTML = `<img id="pack-avatar-${pack.id}-null" class="avatar">${creatorName}`;
      }

      avatar_elements.appendChild(avatar_element);
    });

    const packTile = document.createElement('div');

    let dbdVersionTitle = pack.dbd_version;

    for (let i = 0; i < dbd_version_title.length; i++) {
      if (dbd_version_title[i][0] == dbdVersionTitle) {
        dbdVersionTitle = dbd_version_title[i][1];
        break;
      }
    }

    let packLastUpdated = '';
    const count_days = formatRelativeTime(pack.updated_at);

    if (count_days > 1) {
      packLastUpdated = `${count_days} Days Ago`;
    } else if (count_days == 0) {
      packLastUpdated = 'Today';
    } else if (count_days == 1) {
      packLastUpdated = 'Yesterday';
    }

    let pack_downloads = pack.downloads.toLocaleString('en-US');



    let packContent = "";
    for (let i = 0; i < pack.has.length; i++) {
      if (packContent == "")
        packContent += `${formatText(pack.has[i])}`;
      else
        packContent += `, ${formatText(pack.has[i])}`
    }
    const tile =
      `
<div id="pack-banner-${pack.id}" class="_1he3xh0 pack_tile"><img src="${window.directory.currentPath()}/cached_images/${pack.id}_${pack.current_version}/banner.png"
    loading="lazy" alt="Pack Banner for ${pack.title}" class="_1he3xh1 pack_banner">
  <div class="_1he3xh5">
    <span class="_1he3xh6 pack_title">${pack.title}</span>
    <div class="_1he3xh7 badge bg-secondary pack_version ">v${pack.version}</div>
  </div>
  <div class="_1he3xh4">
    <div class="_1he3xhc variants">
      ${variants_template}
    </div>
    
    <div class="_1he3xha pack_stats"><span title="Dead by Daylight Version"><svg focusable="false" data-prefix="fas" data-icon="code-branch" role="img"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-code-branch">
          <path fill="currentColor"
            d="M80 104c13.3 0 24-10.7 24-24s-10.7-24-24-24S56 66.7 56 80s10.7 24 24 24zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24zM80 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z">
          </path>
        </svg>${dbdVersionTitle}</span><span title="Last Updated"><svg focusable="false" data-prefix="fas" data-icon="upload"
          role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-upload">
          <path fill="currentColor"
            d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z">
          </path>
        </svg><label class="last_updated">${packLastUpdated}</label></span><span title="Total Downloads"><svg focusable="false" data-prefix="fas" data-icon="cloud-arrow-down"
          role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
          class="svg-inline--fa fa-cloud-arrow-down">
          <path fill="currentColor"
            d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z">
          </path>
        </svg><label class="downloads">${pack_downloads}</label></span></div>
    <div title="${packContent}" class="_1he3xhb"><svg focusable="false" data-prefix="fas" data-icon="box-open" role="img"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-box-open">
        <path fill="currentColor"
          d="M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128h2.2z">
        </path>
      </svg><label class="pack_content">${packContent}</label></div>
      <button value="${pack.url}" class="download-pack btn btn-sm w-100 d-block">Download</button>
  </div>
</div>
        `;
    packTile.innerHTML = tile;
    packTile.id = pack.id;

    const variant_container = packTile.getElementsByClassName('variants')[0];
    console.log(variant_container);

    variant_container.parentNode.insertBefore(avatar_elements, variant_container.nextElementSibling);

    if (variants_template != '') {
      const variant_container = packTile.getElementsByClassName(`variants-${pack.id}`)[0];
      variant_container.innerHTML = '';

      for (const variant of variants) {
        variant_container.appendChild(variant);
      }
    }

    packview[0].appendChild(packTile);
    console.log(`Added tile for ${pack.title}`);
  });
}

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const currentDate = new Date();
  const diffInMilliseconds = currentDate - date;
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  return diffInDays;
}

function formatText(input) {
  input = input.replace('addons', 'add-Ons');
  const words = input.replace('_', ' ').split(' ');
  let joinedWords = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    joinedWords += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
  }
  return joinedWords.trim();
}

function downloadBanner(pack_id, current_version) {
  const downloadURL = `https://cdn.nightlight.gg/packs/${pack_id}/${current_version}/banner.png`;
  const directoryPath = `${window.directory.currentPath()}/cached_images/${pack_id}_${current_version}`;
  const fileName = `banner.png`;

  fs.access(`${directoryPath}/${fileName}`, fs.constants.F_OK, (err) => {
    if (err) {
      window.webFunctions.downloadFile(downloadURL, directoryPath, fileName)
        .then((filePath) => {
          const banner_div = document.getElementById(`pack-banner-${pack_id}`);
          if (banner_div) {
            const banner_img = banner_div.querySelector('img');
            if (banner_img) {
              banner_img.src = filePath;
            }
          }
        })
    } else {
      filePath = `${directoryPath}/${fileName}`;
      const banner_div = document.getElementById(`pack-banner-${pack_id}`);
      if (banner_div) {
        const banner_img = banner_div.querySelector('img');
        if (banner_img) {
          banner_img.src = filePath;
        }
      }
    }
  });
}

async function downloadAvatar(user_id, avatar_id, pack_id) {

  let defaultAvatar = false;
  if (avatar_id == null) {
    defaultAvatar = true;
  }

  const directoryPath = `${window.directory.currentPath()}/cached_images/${user_id}_${avatar_id}`;
  const fileName = `avatar.png`;

  fs.access(`${directoryPath}/${fileName}`, fs.constants.F_OK, async (err) => {
    if (err) {
      if (defaultAvatar) {
        await downloadDefaultAvatar(user_id, avatar_id, pack_id);
      } else {
        await downloadSpecificAvatar(user_id, avatar_id, pack_id);
      }
    } else {
      const avatar_img = document.getElementById(`pack-avatar-${pack_id}-${user_id}`);
      if (avatar_img) {
        avatar_img.src = `${directoryPath}/${fileName}`;
      }
    }
  });
}

async function downloadSpecificAvatar(user_id, avatar_id, pack_id) {

  const downloadURL = `https://cdn.nightlight.gg/avatars/${user_id}/${avatar_id}/60.png`;
  const directoryPath = `${window.directory.currentPath()}/cached_images/${user_id}_${avatar_id}`;
  const fileName = `avatar.png`;

  window.webFunctions.downloadFile(downloadURL, directoryPath, fileName)
    .then((filePath) => {
      if (filePath != null) {
        const avatar_img = document.getElementById(`pack-avatar-${pack_id}-${user_id}`);
        if (avatar_img) {
          avatar_img.src = filePath;
        }
      }
    })
}

async function downloadDefaultAvatar(user_id, avatar_id, pack_id) {

  const downloadURL = `https://cdn.nightlight.gg/avatars/default/_.png`;
  const directoryPath = `${window.directory.currentPath()}/cached_images/${user_id}_${avatar_id}`;
  const fileName = `avatar.png`;

  window.webFunctions.downloadFile(downloadURL, directoryPath, fileName)
    .then((filePath) => {
      if (filePath != null) {
        const avatar_img = document.getElementById(`pack-avatar-${pack_id}-${user_id}`);
        if (avatar_img) {
          avatar_img.src = filePath;
        }
      }
    })
}

function setNavElemets(current_visible_packs, packs_per_page) {
  const navPageInfoArray = document.getElementsByClassName('d-md-inline');
  //console.log(navPageInfoArray.length);
  if (navPageInfoArray.length >= 2) {
    navPageInfo = navPageInfoArray[1].parentElement;
    navPageInfo.innerHTML = `<span class="d-none d-md-inline">Showing ${current_visible_packs} of ${total_packs}</span>`;
  }

  let pageNum = document.getElementsByClassName('mx-1');
  if (pageNum.length == 1) {
    pageNum = pageNum[0];

    const pageNumInput = `<input id="input_page_nav" value="${current_page}" min="1" step="1" max="NaN" type="number" pattern="\d*" class="form-control text-center">`;
    pageNum.innerHTML = pageNumInput;

    const pageOf = document.createElement('span');
    total_pages = getTotalPageNum(packs_per_page, total_packs);
    pageOf.innerHTML = `<span class="d-none d-md-inline"> of ${total_pages}</span>`;

    pageNum.appendChild(pageOf);
  }
}

function getTotalPageNum(packs_per_age, total_packs) {
  total_pages = Math.ceil(total_packs / packs_per_age);
  return total_pages
}