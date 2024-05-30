const nightlight_template = fs.readFileSync(`./app/js/NightLight/nightlight.html`, 'utf8');

console.log("Embedding webpage...");
const webview = document.getElementById('webview-container-page');
webview.innerHTML = nightlight_template;
webview.style.display = 'block';