/**
 * To-Do: Add closure to this loading process - mike
 */

var script_name = 'colt45_2d.js',
    required_modules = [
      './lib/gritsgame/core.js',
      './lib/gritsgame/spritesheet.js', //requires core.js
//      './lib/gritsgame/xhr.js',
//      './lib/gritsgame/tiledmap.js',    // requires xhr.js
      './lib/TiledMap.js', 
      './lib/Colt45_2d.js'            //requires core.js and spritesheet.js
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
        if ( scripts[i].src.indexOf(script_name) > -1 ) {
            return scripts[i].src.replace(script_name , "");
        }
    }
    return "";
}

var baseURL = getBaseURL();

for (var module in required_modules ) {
    loadRequiredModule( baseURL + "" + required_modules[module] );
}
