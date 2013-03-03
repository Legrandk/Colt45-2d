Colt45_2d = Class.extend({

    canvas  : null,
    context : null,
    
    sheets:     {},
    
    // global settings ---------------------------------------------------------
    config : {
        canvas : { id: 'game_canvas', w: 800, h: 600 },
        url    : { atlas:'./assets/json/grits_effects.json' }
    },
    
    // setup ---------------------------------------------------------------------
    init : function( params ) {
        this.config  = this.loadConfig(params);
        this.canvas  = this.createCanvas();        
        this.context = this.canvas.getContext('2d');
    },
    loadConfig: function(params){
        if(params!=null&&(typeof params)!='object') throw "Expected a parameters object";
        return merge(this.config, params); // core merge function
    },
    createCanvas : function(){
        var canvas      = document.createElement("canvas");
        canvas.id       = this.getConfig('canvas.id');
        canvas.width    = this.getConfig('canvas.w');
        canvas.height   = this.getConfig('canvas.h');
        document.body.appendChild( canvas );
        return canvas;
    },
    
    // xhr ---------------------------------------------------------------------
    //loadAtlas : function(){ var u = this.getConfig('url.atlas'); },
    
    loadSpriteSheet:    function(jsonURL){
        this.loadJSON(jsonURL, loadSpriteSheetCB);
    },
    loadSpriteSheetCB:  function(){
        var json = this.responseText;
        //self.parseAtlasDefinition(json);
    },
    
    xhr: function(jsonURL, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", jsonURL, true);
        //xhr.onload = callback;
        xhr.onload = function() { callback(xhr);}    
        xhr.send();
    },
    
    // drawing -----------------------------------------------------------------
    drawImage : function ( image , posX, posY ) {
        this.context.drawImage( image, posX, posY );
    },
    
/*
    function drawSprite(spritename, posX, posY) {
        for(var sheetName in gSpriteSheets) {
            var sheet   = gSpriteSheets[sheetName];
            var sprite  = sheet.getStats(spritename);           // see if a sprite exists
            if(sprite === null) { continue; }                   // if not, try next sheet
            __drawSpriteInternal(sprite, sheet, posX, posY);    // if so, draw it
            return;
        }
    }
    
    // Draw sprites giving sprite object SpriteSheet instance, and canvas xy position.
    function __drawSpriteInternal(spt, sheet, posX, posY) {
        if (spt === null || sheet === null) { return; }
        var hlf = { x: spt.cx, y: spt.cy };
        ctx.drawImage(sheet.img, spt.x, spt.y, spt.w, spt.h, posX + hlf.x, posY + hlf.y, spt.w, spt.h);
    }
*/

    clearContext: function(){
        var w = this.getConfig('canvas.w'),
            h = this.getConfig('canvas.h');
        this.context.clearRect(0, 0, w, h);
    },
    
    // util --------------------------------------------------------------------
    getConfig: function(n, dflt) {
        var parts = n.split('.'), res = this.config, i;
        for (i = 0; i < parts.length; i++) {
            if (typeof res[parts[i]] !== 'undefined') { res = res[parts[i]]; }
            else { return dflt; }
        }
        return res;
    }

});
