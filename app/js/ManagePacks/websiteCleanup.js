function removeManageNavigation() {
    console.log("Removing Navigation for Manage Packs...");
    const main = document.getElementById('manage_packs_main');
    if (main != null) {
        main.style.marginLeft = "0px";
        main.style.marginRight = "20px";
        main.style.marginTop = "20px";
    }
}