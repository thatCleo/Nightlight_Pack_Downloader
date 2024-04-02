function setOptionValuesToElements() {
    console.log("Setting Option Values to Elements...");
    const dbdPathElement = document.getElementById('dbd-path');
    window.options.getDBDPath()
    .then(dbdPath => {
        dbdPathElement.value = dbdPath
    })


    console.log(window.options.getDBDPath());
    dbdPath.value = window.options.getDBDPath();
}

function removeManageNavigation() {
    console.log("Removing Navigation for Manage Packs...");
    const main = document.getElementById('options_main');
    if (main != null) {
        main.style.marginLeft = "0px";
        main.style.marginRight = "20px";
        main.style.marginTop = "20px";
    }
}