function setOptionValuesToElements() {
    console.log("Setting Option Values to Elements...");
    const dbdPathElement = document.getElementById('dbd-path');
    window.options.getDBDPath()
    .then(result => {
        dbdPathElement.value = result
    })

    const check_pack_on_startup = document.getElementById('options-toggle-autoupdate-pack').childNodes[1];
    window.options.getCheckForPackUpdateOnStartup()
    .then((check) => {
        if (check) {
            check_pack_on_startup.classList.remove('hidden');
        }
    });

    const check_app_on_startup = document.getElementById('options-toggle-autoupdate-app').childNodes[1];
    window.options.getCheckForAppUpdateOnStartup()
    .then((check) => {
        if (check) {
            check_app_on_startup.classList.remove('hidden');
        }
    });


    console.log(window.options.getDBDPath());
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