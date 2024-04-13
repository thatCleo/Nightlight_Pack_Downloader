function setOptionValuesToElements() {
    console.log("Setting Option Values to Elements...");
    const dbdPathElement = document.getElementById('dbd-path');
    window.options.getDBDPath()
    .then(result => {
        dbdPathElement.value = result
    })


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