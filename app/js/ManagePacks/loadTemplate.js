const manage_packs_container = document.getElementById('manage-packs-page');
const manage_packs_template = fs.readFileSync(`./app/js/ManagePacks/managepacks.html`, 'utf8');;

manage_packs_container.innerHTML = manage_packs_template;

removeManageNavigation();
createPackTiles_Manage();
createPackOrderTiles_Manage();