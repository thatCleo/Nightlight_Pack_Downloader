var dbd_version_title = [[]];
console.log("Fetching Game Versions");
window.webFunctions
  .httpGet(
    "https://api.github.com/repos/thatCleo/Nightlight_Pack_Downloader/contents/game-versions.json?ref=pull-gameversions-from-github-repo",
  )
  .then(
    (response) => {
      response = JSON.parse(response);
      const gameVersionData = JSON.parse(atob(response.content));
      dbd_version_title = gameVersionData["game-versions"];
      startRendering();
    },
    (error) => {
      console.error(error);
      showNotification(
        "Failed to fetch Game Version Info.",
        7500,
        "error-fetch-game-versions",
      );
      startRendering();
    },
  );
