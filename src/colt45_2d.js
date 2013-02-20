Colt45_2d = Class.extend({

    canvas  : null,
    context : null,
    
    // global settings -----------------------------------------------------------
    config : {
        canvas:{  id: 'game_canvas', size : { w: 800, h: 600 } }
    },
    
    // setup ---------------------------------------------------------------------
    init : function( default_params ) {
        this.canvas  = this.createCanvas();

        if ( default_params.size ) {
        	if (default_params.size.w) this.canvas.width = default_params.size.w;
        	if (default_params.size.h) this.canvas.height = default_params.size.h;
        }

        this.context = this.canvas.getContext('2d');
    },
    createCanvas : function(){
        var canvas      = document.createElement("canvas"),
        config          = this.getConfig('canvas');
        canvas.id       = config.id;
        canvas.width    = config.size.w;
        canvas.height   = config.size.h;
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