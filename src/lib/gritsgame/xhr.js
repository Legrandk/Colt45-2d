// Colt45_2d has deprecated this file! See lib/Colt45_2d.js::xhrGet
function xhrGet(reqUri,callback) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", reqUri, true);
    //xhr.onload = callback;
    xhr.onload = function() { callback(xhr);}

    xhr.send();
}
