const options_container = document.getElementById('options-page');
const options_template = fs.readFileSync(`./app/js/Options/options.html`, 'utf8');

options_container.innerHTML = options_template;
removeManageNavigation();
setOptionValuesToElements();