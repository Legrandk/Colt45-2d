Colt45_2d = Class.extend({

    canvas  : null,
    context : null,
    
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
    loadAtlas : function(){
        var u = this.getConfig('url.atlas');  
    },
    loadSpriteSheet: function(){},
    
    // drawing -----------------------------------------------------------------
    drawSprite : function ( image , posX, posY ) {
        this.context.drawImage( image, posX, posY );
    },
    clearContext: function(){
        var w = this.getConfig('canvas.w'),
            h = this.getConfig('canvas.h');
        this.context.clearRect(0, 0, w, h);
    },
    
    // util --------------------------------------------------------------------
    getConfig: function(n,dflt){
        var res, cmd;
        try{ cmd = "this.config['"+(n+'').split('.').join("']['")+"']";  res = eval(cmd); }
        catch(e) { console.log('Exception: getConfig -> '+e.toString()); res = dflt;      }
        return ((typeof res) =='undefined') ? dflt : res;
    }

});