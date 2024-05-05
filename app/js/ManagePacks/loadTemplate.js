const manage_packs_container = document.getElementById('manage-packs-page');
const manage_packs_template = `
<div>
    <main id="manage_packs_main" class="container px-4">
        <div><strong class="text-muted">Icon Toolbox</strong>
            <h1 class="mb-2">Manage Icon Packs</h1>
            <div class="text-muted mb-3">Manage you downloaded packs.</div>
            <button id="reset-all-packs" class="button_icons_revert btn btn-sm w-100 d-block">Revert to default Icons</button>
        </div>
    </main>
    <div id="alert_bar_container"></div>
    <div class="container px-4">
    <div id="manage_packs_main_content" class="row row-cols-1 row-cols-lg-2 row-cols-xxl-3 g-3"></div>
    <div class="pack-order-container-outer" id="pack-order-container-outer></div>
    </div><footer class="footer pb-3 nl-footer">
    <div class="container px-4">
        <div class="row">
            <div class="col-xs-4 col-md-4">
                <h3>Night<span class="text-nl">Light</span> <small class="text-muted fs-5">Icon Packs</small></h3>
                <p class="text-muted mb-2">Icon Pack Tool. Built on top of <a class="open_link" value="https://nightlight.gg/">Nightlight.gg</a> by <a class="open_link" value="https://boop.pro/">BritishBoop</a></p>
                <p class="text-muted"><small>Not affiliated with Behaviour Interactive, Dead by Daylight™ or Nightlight.gg in any way</small></p>
            </div>
        </div>
    </div>
</footer>
</div>`;

manage_packs_container.innerHTML = manage_packs_template;

removeManageNavigation();
createPackTiles_Manage();