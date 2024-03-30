function removeNavigation() {
    const sidebar = document.getElementsByClassName('_9byavn0');
    if(sidebar.length > 0) {
        sidebar[0].remove();
    }

    const topbar = document.getElementsByClassName('_1c6r1e70');
    if(topbar.length > 0) {
        topbar[0].remove();
    }

    const mainContainer = document.getElementsByClassName('main');
    if(mainContainer.length > 0) {
        mainContainer[0].style.marginLeft = "0px";
    }

    const main = document.getElementById('main').style.marginTop = "20px";
}