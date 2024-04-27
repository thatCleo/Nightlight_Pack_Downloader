const nightlight_template = `
<div class="main" style="margin-left: 0px;">
    <main class="container px-4" id="main" style="margin-left: 0px; margin-right: 20px; margin-top: 20px;">
        <div><strong class="text-muted">Icon Toolbox</strong>
            <h1 class="mb-2">Custom Icon Packs</h1>
            <div class="text-muted mb-3">A library of community made custom Icon Packs for Dead by Daylight to
                download and install from Nightlight.gg</div>
            <form class="row"><input type="submit" hidden="">
                <div class="col-12">
                    <div class="d-flex align-items-center mb-2 gap-2 flex-wrap">
                        <h5 class="mb-0 py-2">Filters</h5>
                        <div class="btn btn-sm lh-1 disabled" id="button_filter_apply" role="button">Apply</div>
                        <div class="btn btn-sm lh-1" id="button_filter_reload" role="button">Refresh</div>
                        <div class="btn btn-secondary btn-sm me-auto lh-1 disabled" role="button">Reset</div>
                        <div class="align-items-center d-flex gap-2"><label class="fw-bold d-flex align-items-center">Shortcuts</label>
                            <div class="btn btn-secondary btn-sm lh-1" id="button_filter_shortcut_portraits" role="button">Portraits Only</div>
                            <div class="btn btn-secondary btn-sm lh-1" id="button_filter_shortcut_perks" role="button">Perks Only</div>
                            <div class="btn btn-secondary btn-sm lh-1" id="button_filter_shortcut_equippable" role="button">All Equippable</div>
                        </div>
                    </div>
                    <div class="_1x345eg0">
                        <div class="_1x345eg3">
                            <div class="row g-2" id="row_1">
                                <div class="col-12 col-md-6 col-lg-3">
                                    <div class="cell align-items-center d-flex gap-2"><label for=":R6lca9:" class="fw-bold d-flex align-items-center">Sort</label><select class="form-select" aria-label="Sort" id="filter_sort_by" autocomplete="off"></select></div>
                                </div>
                                <div class="col-12 col-md-6 col-lg-4">
                                    <div class="cell align-items-center d-flex gap-2"><label for=":Ralca9:" class="fw-bold d-flex align-items-center">Author</label><select class="form-select" aria-label="Author" id="sort_by_author" autocomplete="off"></select></div>
                                </div>
                                <div class="col-12 col-md-6 col-lg-5">
                                    <div class="cell align-items-center d-flex gap-2"><label for=":Relca9:" class="fw-bold d-flex align-items-center">Search</label><input type="text" class="form-control" id="filter_search" name="search" autocomplete="off" maxlength="50" placeholder="Title, URL, or description..." style="padding:.3rem 1rem .3rem .5rem;font-size:14px;border-radius:2.5px" value=""></div>
                                </div>
                                <div class="col-12 col-md-6 col-lg-2 col-xl-2">
                                    <div class="cell d-flex gap-2 h-100 align-items-center hidden"></div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="cell d-flex gap-1 justify-content-between align-items-center hidden">
                                        <strong class="d-flex flex-column align-items-center">Includes <div class="d-flex">
                                                <div role="button" class="_15ryw141 _15ryw140 _15ryw144"></div>
                                                <strong class="_1gc8fw10 _1gc8fw12"></strong>
                                                <div role="button" class="_15ryw142 _15ryw140 _15ryw144"></div>
                                            </div></strong><select class="form-select" aria-label="Includes" id=":Rmlca9:" multiple="" autocomplete="off"></select>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6 col-lg-4">
                                    <div class="cell align-items-center d-flex gap-2 h-100 hidden"><label for=":Rqlca9:" class="fw-bold d-flex align-items-center">Version</label><select class="form-select" aria-label="Version" id=":Rqlca9:" autocomplete="off"></select></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xxl-3 g-3 mt-0"></div>
            <div class="my-3">
                <div class="d-flex justify-content-between mt-3">
                    <div class="d-flex align-items-center text-nowrap">
                        <div class="d-flex align-items-center me-3"><span class="me-2 d-none d-md-inline">Per
                                Page:</span><select class="form-select " autocomplete="off"></select></div>
                        <span><span class="d-none d-md-inline">Showing </span>NaN</span>
                    </div>
                    <div class="d-flex align-items-center gap-2"><button disabled="" class="btn btn-sm btn-secondary d-none d-sm-inline" style="background-color:#2d2d2d;border-color:#2d2d2d"><svg focusable="false" data-prefix="far" data-icon="angles-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-angles-left">
                                <path fill="currentColor" d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239zM399 79L239 239c-9.4 9.4-9.4 24.6 0 33.9L399 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-143-143L433 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0z">
                                </path>
                            </svg></button><button disabled="" class="btn btn-sm btn-secondary" style="background-color:#2d2d2d;border-color:#2d2d2d"><svg focusable="false" data-prefix="far" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-left">
                                <path fill="currentColor" d="M47 239c-9.4 9.4-9.4 24.6 0 33.9L207 433c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L97.9 256 241 113c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L47 239z">
                                </path>
                            </svg></button>
                        <div class="d-flex mx-1 align-items-center gap-1 text-nowrap"><input class="form-control text-center" style="width:4rem;padding:.3rem .5rem;font-size:14px;border-radius:2.5px" min="1" step="1" max="NaN" type="number" pattern="\d*" value="1">of <!-- -->NaN</div><button class="btn btn-sm btn-secondary" style="background-color:#2d2d2d;border-color:#2d2d2d"><svg focusable="false" data-prefix="far" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-right">
                                <path fill="currentColor" d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z">
                                </path>
                            </svg></button><button class="btn btn-sm btn-secondary d-none d-sm-inline" style="background-color:#2d2d2d;border-color:#2d2d2d"><svg focusable="false" data-prefix="far" data-icon="angles-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-angles-right">
                                <path fill="currentColor" d="M113 433L273 273c9.4-9.4 9.4-24.6 0-33.9L113 79c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l143 143L79 399c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0zm192 0L465 273c9.4-9.4 9.4-24.6 0-33.9L305 79c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l143 143L271 399c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0z">
                                </path>
                            </svg></button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer class="footer pb-3 nl-footer">
        <div class="container px-4">
            <div class="row">
                <div class="col-xs-4 col-md-4">
                    <h3>Night<span class="text-nl">Light</span> <small class="text-muted fs-5">Icon Packs</small></h3>
                    <p class="text-muted mb-2">Icon Pack Tool. Built on top of Nightlight.gg by BritishBoop</p>
                    <p class="text-muted"><small>Not affiliated with Behaviour Interactive, Dead by Daylight™ or Nightlight.gg in any way</small></p>
                </div>
            </div>
        </div>
    </footer>
</div>`;

console.log("Embedding webpage...");
const webview = document.getElementById('webview-container-page');
webview.innerHTML = nightlight_template;
webview.style.display = 'block';