/**
 * To-do:
 * Review the updated lib/udacity/Map.js class
 * Include canvas tiling!
 */

var TiledMap = Class.extend({

    currMapData: null,              // full parsed json
    tileSets: [],                   // tileSets stores each individual tileset from the map.json's 'tileSets' Array. See structure in parseAtlasDefinition.
    numXTiles: -1, numYTiles:-1,    // Width and height of the map in tiles from map.json's 
    tileSize: { "x": -1, "y":-1 },  // The size of each individual map tile from Map.json's tilewidth and tileheight values.  Initialized to something, rather than null (in pixels). 
    pixelSize: { "x":-1, "y":-1 },  // The size of the entire map, calculated using map.json's numXTiles, numYTiles, and tileSize parameters. Initialized to something, rather than null (in pixels).
    imgLoadCount: 0,                // Counter to keep track of how many tile images we have successfully loaded.
    fullyLoaded: false,             // Boolean flag we set once our tile images has finished loading.

    //init:function(){ console.log("new TiledMap"); },

    load: function (map) { // Load the json file at the url 'map' into memory. 
        var that = this;
        xhrGet(map, function (data) {
          that.parseMapJSON(data.responseText);
        });
    },

    parseMapJSON: function (mapJSON) {
        var that = this;
        that.currMapData    = JSON.parse(mapJSON);
        var mdata             = that.currMapData;
        // map certain properties to top level, for some reason...
        that.numXTiles      = mdata.width;
        that.numYTiles      = mdata.height;
        that.tileSize.x     = mdata.tilewidth;
        that.tileSize.y     = mdata.tileheight;
        that.pixelSize.x    = that.numXTiles * that.tileSize.x;
        that.pixelSize.y    = that.numYTiles * that.tileSize.y;
        for(var i = 0; i < mdata.tilesets.length; i++) { // Load each tileset master image
            var tsdata = mdata.tilesets[i],
                img     = new Image();
            img.onload = function () {
                that.imgLoadCount++;
                if (that.imgLoadCount === mdata.tilesets.length) { that.fullyLoaded = true; }
            };
            img.src = tsdata.image; // url of the the tileset's master image
            var ts = {
                    "firstgid":     tsdata.firstgid,
                    "image":        img,
                    "imageheight":  tsdata.imageheight,
                    "imagewidth":   tsdata.imagewidth,
                    "name":         tsdata.name,
                    "numXTiles":    Math.floor(tsdata.imagewidth / that.tileSize.x),
                    "numYTiles":    Math.floor(tsdata.imageheight / that.tileSize.y)
                };
            that.tileSets.push(ts);
        }
    },

    //-----------------------------------------
    // Grabs tile from our 'layer' data and return the 'pkt' object for the layer we want to draw.
    // It takes as a parameter 'tileIndex', which is the id of the tile we'd like to draw in our layer data.
    getTilePacket: function (tileIndex) {
        var that    = this,
            tsets   = that.tileSets,
            tset    = null,
            tset_i  = 0,
            pkt     = {
                "img": null,        // The Image object of the given tile.
                "px": 0, "py": 0    // The (x,y) values that we want to draw the tile to in map coordinates.
            };
        // Find the tileset that we want to draw
        for(tset_i= tsets.length - 1; tset_i >= 0; tset_i--) {
            // If the tileset's 'firstgid' parameter is less than the 'tileIndex' of the tile we want to draw,
            // then we know that tile is not in the given tileset and we can skip to the next one.
            if(tsets[tset_i].firstgid <= tileIndex){ tset = tsets[tset_i]; break; }
        }
        if(tset===null) throw "No tileSet found for tileIndex:"+tileIndex;
        // Wet the 'img' parameter to the Image object of the appropriate 'tileset' found above.
        pkt.img = tset.image;
        // Calculate the position to draw to based on:
        var localIdx = tileIndex - tset.firstgid,           //   1) The local id of the tile calculated from the 'tileIndex' of the tile we want to draw and the 'firstgid' of the tileset we found earlier.
            lTileX = Math.floor(localIdx % tset.numXTiles), //   2) The (x,y) position of the tile in terms of the number of tiles in our tileset.                                                            
            lTileY = Math.floor(localIdx / tset.numXTiles); //      Based on the 'numXTiles' of the given tileset. Note that 'numYTiles' isn't actually needed here. Think about how the tiles are arranged.                 
        pkt.px = (lTileX * that.tileSize.x);                //   3) the (x,y) pixel position in our tileset image of the tile we want to draw. 
        pkt.py = (lTileY * that.tileSize.y);                //      Based on the tile position we just calculated and the (x,y) size of each tile in pixels.
        return pkt;
    },

    draw: function (ctx) {
        var that = this;
        if(!that.fullyLoaded) return;

        // For every single layer in the 'layers' Array of 'currMapData'...
        for(var layerIdx = 0; layerIdx < that.currMapData.layers.length; layerIdx++) {  
            // Check if the 'type' of the layer is "tilelayer". 
            if(that.currMapData.layers[layerIdx].type != "tilelayer") continue; // If it isn't, we don't care about drawing it...
            var dat = that.currMapData.layers[layerIdx].data; // ...Grab the 'data' Array of the given layer...

            
            for(var tileIDX = 0; tileIDX < dat.length; tileIDX++) { // ...For each tileID in the 'data' Array...
                // ...Check if that tileID is 0. Remember, we don't draw those, so we can skip processing them...
                var tID = dat[tileIDX]; if(tID === 0) continue;

                // ...If the tileID is not 0.
                var tPKT = that.getTilePacket(tID); // grab the packet data using getTilePacket            
                var worldx = (Math.floor(tileIDX % that.numXTiles)) * that.tileSize.x;
                var worldy = (Math.floor(tileIDX / that.numXTiles)) * that.tileSize.y;

                ctx.drawImage(
                    tPKT.img,           // image object to be drawn
                    tPKT.px,            // source x coordinate in our Image
                    tPKT.py,            // source y coordinate in our Image
                    that.tileSize.x,    // source width of our tile, should be same as destination so as not to stretch tiles
                    that.tileSize.y,    // source height of our tile, should be same as destination so as not to stretch tiles
                    worldx, worldy,     // canvas x and y coordinates
                    that.tileSize.x,    // destination width
                    that.tileSize.y     // destination height
                );
                

            }
        }
    }

});
