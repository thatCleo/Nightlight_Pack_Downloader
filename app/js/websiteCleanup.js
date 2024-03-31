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

    const desktopAppDowloadInfo = document.getElementsByClassName('alert-info');
    if(desktopAppDowloadInfo.length > 0 && desktopAppDowloadInfo[0].innerText.includes('To install packs automatically')) {
        desktopAppDowloadInfo[0].remove();
    }

    const navPageInfoRedundant = document.getElementsByClassName('d-sm-inline');
    if(navPageInfoRedundant.length > 0) {
        navPageInfoRedundant[0].remove();
    }

    const main = document.getElementById('main');
    if(main != null) {
        main.style.marginLeft = "0px";
        main.style.marginRight = "20px";
        main.style.marginTop = "20px";
    }
}

function addNavigation() {
    let perPage = document.getElementsByClassName('d-md-inline');
    if(perPage.length == 2) {
        const child = perPage[0].parentElement.childNodes;
        console.log(child.length + " child nodes");
        perPage = child[1];

        const options = `
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="18">18</option>
        <option value="24">24</option>`;

        perPage.innerHTML = options;
        perPage.id += "packs_per_page";
    }
}