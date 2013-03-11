// Udacity (c) 2013

// Global dictionary of loaded sprite-sheets instances
// indexed by the atlas URL (i.e. 'grits_effects.png')
var gSpriteSheets = {};  

//-----------------------------------------
SpriteSheetClass = Class.extend({

    img: null,      // The Image object that we created for our atlas.
    url: "",        // The URL path that we grabbed our atlas from.
    sprites: [],    // An array of all the sprites in our atlas.

    //-----------------------------------------
    init: function () {},

    //-----------------------------------------
    load: function (imgName) {          // Load the atlas at the path 'imgName' into memory. 
        this.url = imgName;             // Store the URL of the spritesheet we want.
        var img = new Image();
        img.src = imgName;
        this.img = img;                 // Store the Image object in the img parameter.
        gSpriteSheets[imgName] = this;  // Store this SpriteSheetClass in our global dictionary 
    },

    //-----------------------------------------
    // Define a sprite for this atlas
    defSprite: function (name, x, y, w, h, cx, cy) {
        var spt = {
            "id": name,                     // The name of the sprite as a string
            "x": x, "y":y,                  // The x and y coordinates of the sprite in the atlas.
            "w": w, "h": h,                 // The width and height of the sprite in the altas.
            "cx": cx === null ? 0 : cx,     // The x and y coordinates of the center of the sprite in the atlas.
            "cy": cy === null ? 0 : cy
        };
        this.sprites.push(spt);             // Push into our array of sprite objects.
    },
    
    //-----------------------------------------
    // Parse the JSON file 'atlasJSON' that is associated to this atlas.
    parseAtlasDefinition: function (atlasJSON) {
        var parsed = JSON.parse(atlasJSON);        
        // For each sprite in the parsed JSON,'chaingun.png', etc....
        for(var key in parsed.frames) {
            var sprite = parsed.frames[key];             
            // Define the center of the sprite as an offset (hence the negative)
            var cx = -sprite.frame.w * 0.5;
            var cy = -sprite.frame.h * 0.5;
            // if ( sprite.trimmed ) {;
            //     cx = -(sprite.sourceSize.w * 0.5 - sprite.spriteSourceSize.x);
            //     cy = -(sprite.sourceSize.h * 0.5 - sprite.spriteSourceSize.y);
            // }        
            if ( sprite.trimmed ) {;
                cx = sprite.spriteSourceSize.x - (sprite.sourceSize.w * 0.5);
                cy = sprite.spriteSourceSize.y - (sprite.sourceSize.h * 0.5);
            }
            // Define sprite for this sheet and store it in sprites array.
            this.defSprite(key, 
                sprite.frame.x, sprite.frame.y, 
                sprite.frame.w, sprite.frame.h,
                cx, cy
            );
        }
    },
    
    //-----------------------------------------
    // Find a sprite in this atlas by name.
    getStats: function (name) {
        for(var i = 0; i < this.sprites.length; i++) {
            if(this.sprites[i].id === name) { return this.sprites[i]; }
        }
        return null;
    }

});

/*
//-----------------------------------------
// Draw sprites by sprite name (ie. "chaingun.png") giving canvas xy positions.
function drawSprite(spritename, posX, posY) {
    for(var sheetName in gSpriteSheets) {
        var sheet   = gSpriteSheets[sheetName];
        var sprite  = sheet.getStats(spritename);           // see if a sprite exists
        if(sprite === null) { continue; }                   // if not, try next sheet
        __drawSpriteInternal(sprite, sheet, posX, posY);    // if so, draw it
        return;
    }
}

//-----------------------------------------
// Draw sprites giving sprite object SpriteSheet instance, and canvas xy position.
function __drawSpriteInternal(spt, sheet, posX, posY) {
    if (spt === null || sheet === null) { return; }
    var hlf = { x: spt.cx, y: spt.cy };
    ctx.drawImage(sheet.img, spt.x, spt.y, spt.w, spt.h, posX + hlf.x, posY + hlf.y, spt.w, spt.h);
}

*/