Colt45_2d = Class.extend({
	canvas_id : "game_canvas",
  context : null,

  canvas_size : {
		w : 800,
		h : 600
	},

	init : function() {
		this.canvas = document.createElement("canvas");
		this.canvas.id = this.canvas_id;
		this.canvas.width = this.canvas_size.w;
		this.canvas.height = this.canvas_size.h;

		document.body.appendChild( this.canvas );

		this.context = this.canvas.getContext('2d');
	},

	drawSprite : function ( image , posX, posY ) {
		this.context.drawImage( image, posX, posY );
	}

});