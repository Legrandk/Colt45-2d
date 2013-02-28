var required_modules = [
    'core.js',
    'spritesheet.js', //requires core.js
    'xhr.js',
    'tiledmap.js', // requires xhr.js
    'colt45_2d.js' //requires core.js and spritesheet.js
];

//////////////////////////////////////////////////////////////////

function loadRequiredModule( url ) {
    var node = document.createElement("script");
    node.async = false;
    node.type = 'text/javascript';
    node.charset = 'utf-8';
    node.src = url;

    document.getElementsByTagName('head')[0].appendChild(node);
}

function getBaseURL() {
    var scripts = document.getElementsByTagName('script');

    for ( var i in scripts ) {
        if ( scripts[i].src.indexOf("colt45_2d_boot.js") > -1 ) {
            return scripts[i].src.replace("colt45_2d_boot.js" , "");
        }
    }
    return "";
}

var baseURL = getBaseURL();

for (var module in required_modules ) {
    loadRequiredModule( baseURL + "" + required_modules[module] );
}
