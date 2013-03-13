var Colt45_2d = Class.extend({

    canvas  : null,
    context : null,
    map     : null,
    sheets:     {},
    
    // global settings ---------------------------------------------------------
    config : {
        canvas : { id: 'game_canvas', w: 800, h: 600 },
        sheets : { 
            './assets/images/grits_effects.png':'./assets/json/grits_effects.json'
        }
    },
    
    // setup ---------------------------------------------------------------------
    init : function( params ) {
        this.config  = this.loadConfig(params);
        this.canvas  = this.createCanvas();        
        this.context = this.canvas.getContext('2d');
        this.map     = new TiledMap();  
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
    xhrGet: function(jsonURL, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", jsonURL, true);
        xhr.onload = callback;
        //xhr.onload = function() { callback(xhr);}    
        xhr.send();
    },
    
    // maps --------------------------------------------------------------------
    loadMap: function(url, callback){
        var that = this;
        console.log("load map: " + url);
        that.xhrGet(url, function () {
            var data = this;
            console.log("map loaded: " + data);
            that.map.parseMapJSON(data.responseText);
            var interval = setInterval(function(){
                if(that.map.fullyLoaded){
                    console.log("map fully loaded")
                    that.map.draw(that.context);
                    clearInterval(interval);
                    try{ callback(that.map); } catch(e){  }
                }
            }, 500);
        });
    },
    
    // spritesheets ------------------------------------------------------------
    loadSpriteSheet : function(imageURL, jsonURL, callback){    
        var img     = new Image();
        var that    = this;
        img.src     = imageURL;
        img.onload  = function(){
            that.xhrGet(jsonURL, function(obj){
                var sheet       = new SpriteSheetClass();
                    sheet.url   = imageURL;            // Store the URL of the spritesheet we want.
                    sheet.img   = img;                 // Store the Image object in the img parameter.
                sheet.parseAtlasDefinition(this.responseText);
                that.sheets[imageURL] = sheet;
                if(callback) { try { callback(obj); } catch(e){}; }
            });

        }
    },
    getSpriteSheet: function(imgUrl){
        if(this.sheets[''+imgUrl]) { return this.sheets[''+imgUrl]; }
        else { throw "Unknown SpriteSheet: " + imgUrl; }
    },
    
    // sprites -----------------------------------------------------------------
    getSprite: function(spritename){
        for(var sheetName in this.sheets) {
            var sheet   = this.sheets[sheetName];
            var sprite  = sheet.getStats(spritename);           // see if a sprite exists
            if(sprite === null) { continue; }
            sprite.sheet_name = sheetName;
            return sprite; 
        }
        throw "Unknown sprite: " + spritename;
    },
    drawSprite : function(spritename, posX, posY) {
        var sprite = this.getSprite(spritename),
            sheet  = this.getSpriteSheet(sprite.sheet_name);
        this.__drawSpriteInternal(sprite, sheet, posX, posY);    // if so, draw it
    },
    // Draw sprites giving sprite object SpriteSheet instance, and canvas xy position.
    __drawSpriteInternal:function(spt, sheet, posX, posY) {
        if (spt === null || sheet === null) { return; }
        var hlf = { x: spt.cx, y: spt.cy };
        this.context.drawImage(sheet.img, spt.x, spt.y, spt.w, spt.h, posX + hlf.x, posY + hlf.y, spt.w, spt.h);
    },
    
    // drawing -----------------------------------------------------------------
    drawImage : function ( image , posX, posY ) { this.context.drawImage( image, posX, posY ); },
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
