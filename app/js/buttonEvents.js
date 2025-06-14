const webviewPage = document.getElementById("webview-container-page");
const managePacksPage = document.getElementById("manage-packs-page");
const optionsPage = document.getElementById("options-page");

let buttons = document.getElementsByClassName("button_page_nav");

let packs_per_page = 12;
let current_page = 1;
let total_pages = -1;
let total_packs = -1;

/* Filter varaibles */
const sort_by_default = "downloads";
let sort_by = "downloads";

let author = "";
let includes = "";
const include_mode_deault = "any";
let include_mode = "any";
let search = "";
let dbd_version = "";

/* Variables for drag & drop */
let draggedElement = null;
let previewElement = null;
let insertBefore = null;
let insertedBefore = null;

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("open_link")) {
      let url = event.target.id;

      console.log(`Opening Link: ${url}`);
      window.webFunctions.openLink(url);
    } else if (event.target.classList.contains("download-pack")) {
      if (event.target.innerText != "Download") {
        return;
      }

      const variant_container_top =
        event.target.parentNode.getElementsByClassName("variants")[0];
      const variant_container = variant_container_top
        .getElementsByClassName("container_varaiants")[0]
        .getElementsByClassName("active")[0];
      const value = variant_container.childNodes[0].id.replace("variant-", "");

      variant_container.childNodes[0].classList.add("downloading");

      console.log(`Downloading Pack: ${value}`);

      let data = packData;
      if (event.target.value != value) {
        data = variants_data;
      }

      event.target.innerText = "Downloading...";
      window.packFunctions.downloadPack(value, data).then(() => {
        console.log(`Download finished: ${value}`);

        if (
          variant_container ==
          variant_container_top
            .getElementsByClassName("container_varaiants")[0]
            .getElementsByClassName("active")[0]
        ) {
          event.target.innerText = "Download finished!";
        } else {
          variant_container.childNodes[0].classList.add("downloaded");
        }

        variant_container.childNodes[0].classList.remove("downloading");

        setPackTiles_Manage([value]);
      });
    } else if (event.target.classList.contains("delete-pack")) {
      event.target.parentNode.parentNode.style.width = "0";
      event.target.style.opacity = "0";
      const value = event.target.value;

      console.log(`Deleting Pack: ${value}`);
      window.packFunctions.deletePack(value);
      removePackOrderTile_Manage(value);

      setTimeout(function () {
        event.target.parentNode.parentNode.remove();
      }, 125);
    } else if (event.target.classList.contains("toggle-pack")) {
      const value = event.target.id.replace("manage-tile-", "");

      if (!event.target.classList.contains("manage-pack-tile-pack-active")) {
        console.log(`Activating Pack: ${value}`);
        event.target.classList.add("manage-pack-tile-pack-active");
        addPackOrderTile_Manage(value);
      } else {
        console.log(`Deactivating Pack: ${value}`);
        event.target.classList.remove("manage-pack-tile-pack-active");
        removePackOrderTile_Manage(value);
      }
    } else if (event.target.id.includes("reset-all-packs")) {
      console.log(`Resetting All Packs...`);
      window.packFunctions.resetAllPacks();

      const buttons = document.getElementsByClassName(
        "manage-pack-tile-pack-active",
      );
      const length = buttons.length;

      for (let i = 0; i < length; i++) {
        buttons[0].classList.remove("manage-pack-tile-pack-active");
      }

      const pack_order_contianer = document.getElementById(
        "pack-order-container-outer",
      );
      pack_order_contianer.innerHTML = "";
    } else if (event.target.classList.contains("set-dbd-path")) {
      console.log(`Setting DBD Path...`);
      window.options.setDBDPathFromDialog().then(() => {
        console.log(`DBD Path set!`);
        setOptionValuesToElements();
      });
    } else if (event.target.id.includes("button_page_nav")) {
      console.log(`Prev Page: ${current_page}`);
      if (event.target.id.includes("button_page_nav_0")) {
        // First page Button
        current_page = 1;
        enablePageNavButtons();
        disablePageNavButtonsPrev();
      } else if (event.target.id.includes("button_page_nav_1")) {
        // Previous Page Button
        current_page--;
        enablePageNavButtons();
        if (current_page <= 1) {
          disablePageNavButtonsPrev();
        }
      } else if (event.target.id.includes("button_page_nav_2")) {
        // Next Page Button
        enablePageNavButtons();
        if (current_page < total_pages) {
          current_page++;
        }
        if (current_page >= total_pages) {
          disablePageNavButtonsNext();
        }
      } else if (event.target.id.includes("button_page_nav_3")) {
        // Last Page Button
        current_page = total_pages;
        enablePageNavButtons();
        disablePageNavButtonsNext();
      }

      console.log(`Page: ${current_page}`);

      loadPackTiles();
      scrollToTop();
    } else if (event.target.id.includes("button_filter_reset")) {
      disableFilterResetButton();
      disableFilterApplyButton();

      sort_by = sort_by_default;
      document.getElementById("filter_sort_by").value = sort_by_default;

      author = "";
      document.getElementById("filter_authors").value = "";

      search = "";
      document.getElementById("filter_search").value = "";

      dbd_version = "";
      document.getElementById("filter_dbd_version").value = "";

      includes = "";
      include_mode = include_mode_deault;
      clearFilterShortcuts();

      loadPackTiles();
    } else if (event.target.id.includes("button_filter_apply")) {
      current_page = 1;
      disableFilterApplyButton();
      loadPackTiles();
    } else if (event.target.id.includes("button_filter_reload")) {
      loadPackTiles();
    } else if (event.target.id.includes("button_filter_shortcut_portraits")) {
      clearFilterShortcuts();
      enableFilterApplyButton();

      includes = "portraits";
      include_mode = "only";
      event.target.classList.add("filter_shortcut_active");

      enableFilterResetButton();
    } else if (event.target.id.includes("button_filter_shortcut_perks")) {
      clearFilterShortcuts();
      enableFilterApplyButton();

      includes = "perks";
      include_mode = "only";
      event.target.classList.add("filter_shortcut_active");

      enableFilterResetButton();
    } else if (event.target.id.includes("button_filter_shortcut_equippable")) {
      clearFilterShortcuts();
      enableFilterApplyButton();

      includes = "perks,portraits,items,offerings,powers,addons";
      include_mode = "all";
      event.target.classList.add("filter_shortcut_active");

      enableFilterResetButton();
    } else if (event.target.id.includes("options_clear_cache")) {
      console.log("Clearing Cache...");
      window.fileFunctions.clearCache().then(() => {
        loadPackTiles();

        console.log("Loaded");

        window.fileFunctions.getCacheSize().then((size) => {
          document.getElementsByClassName(
            "label_options_cache_size",
          )[0].innerText = `${size} KB`;
        });
      });
    } else if (event.target.classList.contains("button_variant")) {
      const button = event.target;
      const pack_creator_avatars_display =
        event.target.parentNode.parentNode.parentNode.getElementsByClassName(
          "pack_creator_avatars",
        )[0];
      const stats =
        event.target.parentNode.parentNode.getElementsByClassName(
          "pack_stats",
        )[0];
      const pack_title_display =
        event.target.parentNode.parentNode.parentNode.getElementsByClassName(
          "pack_title",
        )[0];
      const pack_content_display =
        event.target.parentNode.parentNode.getElementsByClassName(
          "pack_content",
        )[0];

      const variant_display = button.parentNode.getElementsByClassName(
        "container_varaiants",
      )[0];
      const variant_titles = variant_display.children;

      const pack_download_button =
        event.target.parentNode.parentNode.getElementsByClassName(
          "download-pack",
        )[0];
      pack_download_button.innerText = "Download";

      let index = variant_display.classList[2];
      const length = variant_display.children.length;

      if (button.classList.contains("button_variant_next")) {
        if (index >= length - 1) return;

        index++;

        variant_titles[index].classList.add("active");
        variant_titles[index - 1].classList.remove("active");

        variant_titles[index].childNodes[0].classList.add(
          "description_variant_active",
        );
        variant_titles[index - 1].childNodes[0].classList.remove(
          "description_variant_active",
        );

        if (index >= 2) {
          variant_titles[index - 2].childNodes[0].classList.remove(
            "description_variant_visible",
          );
        }

        if (index < length - 1) {
          variant_titles[index + 1].childNodes[0].classList.add(
            "description_variant_visible",
          );
        }

        variant_display.classList.remove(`${index - 1}`);
        variant_display.classList.add(`${index}`);
      } else {
        if (index <= 0) return;

        index--;

        variant_titles[index].classList.add("active");
        variant_titles[index + 1].classList.remove("active");

        variant_titles[index].childNodes[0].classList.add(
          "description_variant_active",
        );
        variant_titles[index + 1].childNodes[0].classList.remove(
          "description_variant_active",
        );

        if (index < length - 2) {
          variant_titles[index + 2].childNodes[0].classList.remove(
            "description_variant_visible",
          );
        }

        if (index > 0) {
          variant_titles[index - 1].childNodes[0].classList.add(
            "description_variant_visible",
          );
        }

        variant_display.classList.remove(`${index + 1}`);
        variant_display.classList.add(`${index}`);
      }

      if (
        variant_titles[index].childNodes[0].classList.contains("downloading")
      ) {
        pack_download_button.innerText = "Downloading...";
      } else if (
        variant_titles[index].childNodes[0].classList.contains("downloaded")
      ) {
        pack_download_button.innerText = "Download Finished!";
        variant_titles[index].childNodes[0].classList.remove("downloaded");
      }

      const banner_element =
        variant_display.parentNode.parentNode.parentNode.childNodes[0];
      let id = "";
      let title = "";
      let current_version = "";

      let creator_avatars = "";

      let game_version = "";
      let pack_version = "";
      let last_update = "";
      let downloads = "";
      let has = "";

      const url = variant_titles[index].childNodes[0].id.replace(
        "variant-",
        "",
      );

      variants_data.forEach((variant) => {
        if (variant.url == url) {
          id = variant.id;
          title = variant.title;
          current_version = variant.current_version;
          pack_version = variant.version;
          game_version = variant.dbd_version;
          last_update = variant.updated_at;
          downloads = variant.downloads;

          variant.creators.forEach((creator) => {
            const creatorName = creator.username;

            if (creator.user != null) {
              creator_avatars += `<span class="d-flex align-items-center"><img id="pack-avatar-${variant.id}-${creator.user.user_id}" src="${window.directory.currentPath()}/cached_images/${creator.user.user_id}_${creator.user.avatar_id}/avatar.png" alt="${creator.username}" class="avatar">${creator.username}</span>`;
              downloadAvatar(
                creator.user.user_id,
                creator.user.avatar_id,
                variant.id,
              );
            } else {
              creator_avatars += `<span class="d-flex align-items-center"><img id="pack-avatar-${variant.id}-null" class="avatar">${creatorName}</span>`;
            }
          });

          for (let i = 0; i < variant.has.length; i++) {
            if (has == "") has += `${formatText(variant.has[i])}`;
            else has += `, ${formatText(variant.has[i])}`;
          }
        }
      });

      if (id == "") {
        packData.forEach((pack) => {
          if (pack.url == url) {
            id = pack.id;
            title = pack.title;
            current_version = pack.current_version;
            pack_version = pack.version;
            game_version = getVersionName(pack.dbd_version);
            last_update = pack.updated_at;
            downloads = pack.downloads;

            pack.creators.forEach((creator) => {
              const creatorName = creator.username;

              if (creator.user != null) {
                creator_avatars += `<span class="d-flex align-items-center"><img id="pack-avatar-${pack.id}-${creator.user.user_id}" src="${window.directory.currentPath()}/cached_images/${creator.user.user_id}_${creator.user.avatar_id}/avatar.png" alt="${creator.username}" class="avatar">${creator.username}</span>`;
                downloadAvatar(
                  creator.user.user_id,
                  creator.user.avatar_id,
                  pack.id,
                );
              } else {
                creator_avatars += `<span class="d-flex align-items-center"><img id="pack-avatar-${pack.id}-null" class="avatar">${creatorName}</span>`;
              }
            });

            for (let i = 0; i < pack.has.length; i++) {
              if (has == "") has += `${formatText(pack.has[i])}`;
              else has += `, ${formatText(pack.has[i])}`;
            }
          }
        });
      }

      banner_element.src = `${window.directory.currentPath()}/cached_images/${id}_${current_version}/banner.png`;

      pack_creator_avatars_display.innerHTML = creator_avatars;

      const count_days = formatRelativeTime(last_update);

      if (count_days > 1) {
        last_update = `${count_days} Days Ago`;
      } else if (count_days == 0) {
        last_update = "Today";
      } else if (count_days == 1) {
        last_update = "Yesterday";
      }

      for (let i = 0; i < dbd_version_title.length; i++) {
        if (dbd_version_title[i][0] == game_version) {
          game_version = dbd_version_title[i][1];
          break;
        }
      }

      stats.childNodes[0].childNodes[1].textContent = game_version;
      stats.getElementsByClassName("last_updated")[0].innerHTML = last_update;
      stats.getElementsByClassName("downloads")[0].innerHTML = downloads;

      pack_title_display.innerText = title;
      pack_content_display.innerText = has;
      pack_content_display.parentNode.title = has;
    } else if (event.target.classList.contains("manage-pack-tile-update")) {
      deactivateDragging();

      const pack_tile = event.target.parentNode;

      console.log(pack_tile);

      const pack_banner_img = pack_tile.getElementsByClassName(
        "manage-pack-tile-image",
      )[0];
      const game_version_label = pack_tile.getElementsByClassName(
        "manage-pack-tile-game-version",
      )[0];
      const pack_version_label = pack_tile.getElementsByClassName(
        "manage-pack-tile-pack-version",
      )[0];

      console.log(pack_banner_img);
      console.log(game_version_label);
      console.log(pack_version_label);

      event.target.classList.add("hidden");

      const pack_url = event.target.id.replace("update-", "");
      const url = `https://nightlight.gg/api/v1/packs?page=1&per_page=1&sort_by=downloads&search=${pack_url}`;

      window.webFunctions.httpGet(url).then((data) => {
        data = JSON.parse(data);
        data = data.data.packs;

        let game_version_title = getVersionName(data[0].dbd_version);
        for (let i = 0; i < dbd_version_title.length; i++) {
          if (dbd_version_title[i][0] == game_version_title) {
            game_version_title = dbd_version_title[i][1];
            break;
          }
        }

        game_version_label.innerText = game_version_title;
        pack_version_label.innerText = `v${data[0].version}`;

        updatePackTileBanner(
          data[0].id,
          data[0].current_version,
          pack_banner_img,
        );

        window.packFunctions
          .updatePack(pack_url, data)
          .then((pack_is_active) => {
            if (pack_is_active) {
              updatePackOrderTiles_Manage();
            }
            activateDragging();
          });
      });
    } else if (
      event.target.classList.contains("checkbox-toggle-autoupdate-pack")
    ) {
      if (event.target.childNodes[1].classList.contains("hidden")) {
        event.target.childNodes[1].classList.remove("hidden");
        window.options.setCheckForPackUpdateOnStartup(true);
      } else {
        event.target.childNodes[1].classList.add("hidden");
        window.options.setCheckForPackUpdateOnStartup(false);
      }
    } else if (
      event.target.classList.contains("button-toggle-autoupdate-pack-check-now")
    ) {
      checkForPackUpdates();
    } else if (
      event.target.classList.contains("checkbox-toggle-autoupdate-app")
    ) {
      if (event.target.childNodes[1].classList.contains("hidden")) {
        event.target.childNodes[1].classList.remove("hidden");
        window.options.setCheckForAppUpdateOnStartup(true);
      } else {
        event.target.childNodes[1].classList.add("hidden");
        window.options.setCheckForAppUpdateOnStartup(false);
      }
    }
  });

  document.addEventListener("change", function (event) {
    if (event.target.id == "packs_per_page") {
      const value = event.target.value;
      packs_per_page = value;

      if (current_page > getTotalPageNum(value, total_packs)) {
        current_page = getTotalPageNum(value, total_packs);
      }
      loadPackTiles();
    } else if (event.target.id == "input_page_nav") {
      const value = event.target.value;
      current_page = value;

      if (current_page <= 1) {
        current_page = 1;
      }
      if (current_page >= total_pages) {
        current_page = total_pages;
      }

      enablePageNavButtons();
      if (current_page == 1) {
        disablePageNavButtonsPrev();
      }
      if (current_page == total_pages) {
        disablePageNavButtonsNext();
      }

      loadPackTiles();
      scrollToTop();
    } else if (event.target.id == "filter_sort_by") {
      const value = event.target.value;
      sort_by = value;
      enableFilterResetButton();
      enableFilterApplyButton();
    } else if (event.target.id == "filter_authors") {
      const value = event.target.value;
      author = value;
      enableFilterResetButton();
      enableFilterApplyButton();
    } else if (event.target.id == "filter_dbd_version") {
      const value = event.target.value;
      dbd_version = value;
      enableFilterResetButton();
      enableFilterApplyButton();
    } else if (event.target.id == "dbd-path") {
      const value = event.target.value;
      window.options.setDBDPath(value);
    } else if (event.target.id == "filter_search") {
      const value = event.target.value;
      search = value;
      disableFilterApplyButton();

      loadPackTiles();
      scrollToTop();
    }
  });

  document.addEventListener("input", function (event) {
    if (event.target.id == "filter_search") {
      const value = event.target.value;
      search = value;
      enableFilterResetButton();
      enableFilterApplyButton();
    }
  });

  document.addEventListener("submit", function (event) {
    event.preventDefault(); // no forms needed
  });

  /* Drag & Drop sorting of pack prioritys */

  const draggebleElements = document.querySelectorAll(".pack-order");

  document.addEventListener("dragstart", (event) => {
    event.target.classList.add("pack-order-dragged");

    draggedElement = event.target;
    previewElement = event.target; //.cloneNode(true);
    // previewElement.classList.add('pack-order-preview');
  });

  document.addEventListener("dragend", (event) => {
    draggedElement.classList.remove("pack-order-dragged");
    previewElement.replaceWith(draggedElement);

    draggedElement = null;
    previewElement = null;

    updatePackOrderTiles_Manage();
  });

  for (let i = 0; i < draggebleElements.length; i++) {
    draggebleElements[i].addEventListener("dragover", (event) => {
      const referenceElement = event.target.parentNode;
      if (!referenceElement.classList.contains("pack-order-container")) {
        return;
      }

      if (referenceElement === draggedElement) {
        return;
      }

      const rect = event.target.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const mouseY = event.clientY - centerY;

      insertBefore = mouseY < 0;

      if (insertBefore != insertedBefore) {
        previewElement.remove();
      }

      if (insertBefore) {
        if (!insertedBefore || insertedBefore === null) {
          referenceElement.parentNode.insertBefore(
            previewElement,
            referenceElement,
          );
          insertedBefore = true;
        }
      } else if (!insertBefore) {
        if (insertedBefore || insertedBefore === null) {
          referenceElement.parentNode.insertBefore(
            previewElement,
            referenceElement.nextSibling,
          );
          insertedBefore = false;
        }
      }
    });
  }
});

document.getElementById("nightlight").addEventListener("click", (event) => {
  webviewPage.style.display = "block";
  managePacksPage.style.display = "none";
  optionsPage.style.display = "none";

  const prev_button = document.getElementsByClassName("sidebar-button-active");
  if (prev_button.length == 1) {
    prev_button[0].classList.remove("sidebar-button-active");
  }

  event.target.classList.add("sidebar-button-active");
});

document.getElementById("manage-packs").addEventListener("click", (event) => {
  webviewPage.style.display = "none";
  managePacksPage.style.display = "block";
  optionsPage.style.display = "none";

  const prev_button = document.getElementsByClassName("sidebar-button-active");
  if (prev_button.length == 1) {
    prev_button[0].classList.remove("sidebar-button-active");
  }

  event.target.classList.add("sidebar-button-active");
});

document.getElementById("options").addEventListener("click", (event) => {
  webviewPage.style.display = "none";
  managePacksPage.style.display = "none";
  optionsPage.style.display = "block";

  const prev_button = document.getElementsByClassName("sidebar-button-active");
  if (prev_button.length == 1) {
    prev_button[0].classList.remove("sidebar-button-active");
  }

  event.target.classList.add("sidebar-button-active");

  window.fileFunctions.getCacheSize().then((size) => {
    document.getElementsByClassName("label_options_cache_size")[0].innerText =
      `${size} KB`;
  });
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

function enableFilterResetButton() {
  const button = document.getElementById("button_filter_reset");
  button.className = button.className.replace("disabled", "");
}

function disableFilterResetButton() {
  const button = document.getElementById("button_filter_reset");
  button.className += " disabled";
}

function enableFilterApplyButton() {
  const button = document.getElementById("button_filter_apply");
  button.className = button.className.replace("disabled", "");
}

function disableFilterApplyButton() {
  const button = document.getElementById("button_filter_apply");
  button.className += " disabled";
}

function clearFilterShortcuts() {
  document
    .getElementById("button_filter_shortcut_portraits")
    .classList.remove("filter_shortcut_active");
  document
    .getElementById("button_filter_shortcut_perks")
    .classList.remove("filter_shortcut_active");
  document
    .getElementById("button_filter_shortcut_equippable")
    .classList.remove("filter_shortcut_active");
}

function scrollToTop() {
  webviewPage.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document
  .getElementById("browse-per-page")
  .addEventListener("change", function (event) {
    const value = event.target.value;
    packs_per_page = value;

    const total_page_num = getTotalPageNum(packs_per_page, total_packs);
    if (current_page > total_page_num) {
      current_page = total_page_num;
    }
    loadPackTiles();
  });
