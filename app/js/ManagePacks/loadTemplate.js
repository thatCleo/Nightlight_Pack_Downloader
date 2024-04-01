const manage_packs_container = document.getElementById('manage-packs-page');
const manage_packs_template = `
<div style="margin-left: 0px;">
    <main id="manage_packs_main" class="container px-4">
        <div><strong class="text-muted">Icon Toolbox</strong>
            <h1 class="mb-2">Manage Icon Packs</h1>
            <div class="text-muted mb-3">Manage you downloaded packs.</div>
        </div>
    </main>
    <div id="alert_bar_container"></div>
    <div id="manage_packs_main_content"></div>
    <footer class="footer pb-3 nl-footer">
        <div class="container px-4">
            <div class="row" id="row_3">
                <div class="col-xs-4 col-md-4">
                    <h3>Night<span class="text-nl">Light</span> <small class="text-muted fs-5">Stats &amp; Icon
                            Packs</small></h3>
                    <p class="text-muted mb-2">Icon Pack Tool <br> Based on <a href="https://bightlight.gg/">NightLight.gg</a> built by <a href="https://boop.pro/">BritishBoop</a>
                        © 2021-2023</p>
                    <p class="text-muted"><small>Not affiliated with Behaviour Interactive or Dead by Daylight™
                            in
                            any way</small></p>
                </div>
                <div class="col-xs-3 col-md-3 align-middle">
                    <h5 class="mb-1">Explore</h5>
                    <ul class="ps-3 ps-sm-3">
                        <li><a href="file:///packs">Icon Packs</a></li>
                        <li><a href="file:///buildchallenge">Build Challenge</a></li>
                        <li><a href="file:///perks">Perk &amp; Build Stats</a></li>
                        <li><a href="file:///killers">Killer Stats</a></li>
                        <li><a href="file:///supporter">Supporters</a></li>
                    </ul>
                </div>
                <div class="col-xs-5 col-md-5 col-lg-4 offset-lg-1 col-xl-4 offset-xl-1 mt-3 mt-sm-0">
                    <h5 class="mb-1">Useful Links</h5>
                    <ul class="text-muted ps-3 ps-sm-2">
                        <li><a href="https://nightlight.gg/discord" rel="nofollow noopener noreferrer"
                                target="_blank">Discord</a> - Help, Requests &amp; Bug Reports</li>
                        <li><a href="https://docs.nightlight.gg/" target="_blank" rel="noreferrer">Docs</a> -
                            Information &amp; Guides</li>
                        <li><a href="file:///privacy">Privacy</a> - Privacy Policy</li>
                        <li><a href="file:///about">About</a> - Contact &amp; Project Info</li>
                        <li><a href="https://ko-fi.com/britishboop" rel="nofollow noopener noreferrer"
                                target="_blank">Ko-fi</a> - Support my work</li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</div>`;

manage_packs_container.innerHTML = manage_packs_template;

removeManageNavigation();
createPackTiles_Manage();