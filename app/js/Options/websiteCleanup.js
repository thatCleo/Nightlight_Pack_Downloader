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