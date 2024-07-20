let is_checking_for_pack_updates = false;
let is_checking_for_app_updates = false;

async function checkForUpdates() {
  const check_app_update = await window.options.getCheckForAppUpdateOnStartup();
  const check_pack_update =
    await window.options.getCheckForPackUpdateOnStartup();

  console.log(`checkPackUpdate?: ${check_pack_update}`);
  console.log(`checkAppUpdate?: ${check_app_update}`);

  if (check_app_update) {
    checkForAppUpdate();
  }

  if (check_pack_update) {
    checkForPackUpdates();
  }
}

async function checkForAppUpdate() {
  if (is_checking_for_app_updates) return;
  is_checking_for_app_updates = true;

  let data = await window.webFunctions.httpGet(
    `https://api.github.com/repos/thisMicki/Nightlight_Pack_Downloader/releases`,
  );

  data = JSON.parse(data);
  if (data[0].name != `v${versions.app()}`) {
    document
      .getElementsByClassName("label-options-autoupdate-app-new")[0]
      .classList.remove("hidden");

    showNotification(
      `New App Version (${data[0].name}) avalible on Github!`,
      2500,
      "newAppVersion",
      true,
    );

    setTimeout(() => {
      return true;
    }, 2500);

    setTimeout(() => {
      is_checking_for_app_updates = false;
    }, 2500);
  }
}

async function checkForPackUpdates() {
  if (is_checking_for_pack_updates) return;

  is_checking_for_pack_updates = true;

  const installed_packs = await window.packFunctions.getInstalledPacks();
  const check_delay = 250; // 250ms to not throw to many requests at the server simultaneously
  const updates_found_count = 0;

  if (installed_packs.length > 0) {
    showNotification(
      `Checking for Pack Updates`,
      0,
      "checkForPackUpdates",
      false,
    );

    checkForPackUpdatesDelayed(
      installed_packs,
      0,
      check_delay,
      updates_found_count,
    );
  }
}

async function checkForPackUpdatesDelayed(
  installed_packs,
  index,
  delay,
  updates_found_count,
) {
  let notification_text;
  if (index % 3 == 0) {
    editNotification("Checking for Pack Updates.", "checkForPackUpdates");
  } else {
    editNotification(".", "checkForPackUpdates", true);
  }

  const pack_url = installed_packs[index];
  let pack_data = await window.webFunctions.httpGet(
    `https://nightlight.gg/api/v1/packs?page=1&per_page=1&sort_by=downloads&search=${pack_url}`,
  );

  pack_data = JSON.parse(pack_data);
  const current_pack_data =
    await window.packFunctions.getPackMetaData(pack_url);
  if (pack_data.data.packs[0].updated_at != current_pack_data.last_updated) {
    document.getElementById(`update-${pack_url}`).classList.remove("hidden");
    updates_found_count++;
  }

  if (index + 1 < installed_packs.length) {
    setTimeout(() => {
      checkForPackUpdatesDelayed(
        installed_packs,
        index + 1,
        delay,
        updates_found_count,
      );
    }, delay);
  } else {
    await hideNotification("checkForPackUpdates");
    showNotification(
      `Found ${updates_found_count} Update${updates_found_count == 1 ? "" : "s"}`,
      2500,
      "packUpdatesFound",
    );
    is_checking_for_pack_updates = false;
  }
}

function updatePackTileBanner(pack_id, current_version, img_element) {
  const downloadURL = `https://cdn.nightlight.gg/packs/${pack_id}/${current_version}/banner.png`;
  const directoryPath = `${window.directory.currentPath()}/cached_images/${pack_id}_${current_version}`;
  const fileName = `banner.png`;

  window.webFunctions
    .downloadFile(downloadURL, directoryPath, fileName)
    .then((filePath) => {
      const banner_div =
        (img_element.src = `${directoryPath}/${fileName}?${pack_id}${current_version}`);
    });
}
