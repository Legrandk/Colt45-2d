Colt45_2d = Class.extend({

    canvas  : null,
    context : null,
    
    // global settings -----------------------------------------------------------
    config : {
        canvas:{  id: 'game_canvas', w: 800, h: 600 }
    },
    
    // setup ---------------------------------------------------------------------
    init : function() {
        this.canvas  = this.createCanvas();
        this.context = this.canvas.getContext('2d');
    },
    createCanvas : function(){
        var canvas      = document.createElement("canvas"),
        config          = this.getConfig('canvas');
        canvas.id       = config.id;
        canvas.width    = config.w;
        canvas.height   = config.h;
        document.body.appendChild( canvas );
        return canvas;
    },
    
    // drawing -------------------------------------------------------------------
    drawSprite : function ( image , posX, posY ) {
        this.context.drawImage( image, posX, posY );
    },
    
    // util ----------------------------------------------------------------------
    getConfig: function(n,dflt){
        var res, cmd;
        try{ cmd = "this.config['"+(n+'').split('.').join("']['")+"']"; res = eval(cmd); }
        catch(e) { console.log('Exception: getConfig -> '+e.toString()); res = dflt;    }
        return ((typeof res) =='undefined') ? dflt : res;
    }

});