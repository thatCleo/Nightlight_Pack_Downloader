const options_container = document.getElementById('options-page');
const options_template = `
<div style="margin-left: 0px;">
    <main id="manage_packs_main" class="container px-4">
        <div><strong class="text-muted">Icon Toolbox</strong>
            <h1 class="mb-2">Options</h1>
            <div class="text-muted mb-3">Manage Options like you DBD Path.</div>
        </div>
    </main>
    <div id="alert_bar_container"></div>
    <div class="container px-4">
    <div id="options_main_content" class="row row-cols-1 row-cols-lg-2 row-cols-xxl-3 g-3 flex-options">
    <input type="text" class="form-control dbd-path" placeholder="Set your Dead by Daylight Path" id="dbd-path"><button class="dbd-path-button set-dbd-path">
    <svg class="set-dbd-path" width="38px" height="38px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path class="set-dbd-path" stroke="#D0D0D0" d="M3 8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H9.67452C10.1637 5 10.4083 5 10.6385 5.05526C10.8425 5.10425 11.0376 5.18506 11.2166 5.29472C11.4184 5.4184 11.5914 5.59135 11.9373 5.93726L12.0627 6.06274C12.4086 6.40865 12.5816 6.5816 12.7834 6.70528C12.9624 6.81494 13.1575 6.89575 13.3615 6.94474C13.5917 7 13.8363 7 14.3255 7H17.8C18.9201 7 19.4802 7 19.908 7.21799C20.2843 7.40973 20.5903 7.71569 20.782 8.09202C21 8.51984 21 9.0799 21 10.2V15.8C21 16.9201 21 17.4802 20.782 17.908C20.5903 18.2843 20.2843 18.5903 19.908 18.782C19.4802 19 18.9201 19 17.8 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></button>
    </div>
    </div>
    <footer class="footer pb-3 nl-footer">
        <div class="container px-4">
            <div class="row" id="row_3">
                <div class="col-xs-4 col-md-4">
                    <h3>Night<span class="text-nl">Light</span> <small class="text-muted fs-5">Stats &amp; Icon
                            Packs</small></h3>
                    <p class="text-muted mb-2">Icon Pack Tool <br> Based on <a href="https://nightlight.gg/">NightLight.gg</a> built by <a href="https://boop.pro/">BritishBoop</a>
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

options_container.innerHTML = options_template;
setOptionValuesToElements();