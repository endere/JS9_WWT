


JS9.Image.prototype.testsave = function(fname, type, encoderOpts){
    var key,img, ctx;
    var canvas, width, height;
    if( window.hasOwnProperty("saveAs") ){
    fname = fname || "js9.png";
    width = this.display.width;
    height = this.display.height;
    // create off-screen canvas, into which we write all canvases
    img = document.createElement("canvas");
    img.setAttribute("width", width);
    img.setAttribute("height", height);
    console.log('here!!');
    ctx = img.getContext("2d");
    // image display canvas
    ctx.drawImage(this.display.canvas, 0, 0);
    for( key in this.layers ){
        if( this.layers.hasOwnProperty(key) ){
        // each layer canvas
        if( this.layers[key].dlayer.dtype === "main" &&
            this.layers[key].show ){
            canvas = this.layers[key].dlayer.canvasjq[0];
            ctx.drawImage(canvas, 0, 0, width, height);
        }
        }
    }
    // save as specified type
    type = type || "image/png";
    // sanity check on quality
    if( encoderOpts !== undefined ){
        if( encoderOpts < 0 || encoderOpts > 1 ){
        encoderOpts = 0.95;
        }
    }
    img.toBlob(function(blob){
        saveAs(blob, fname);
    }, type, encoderOpts);
    } else {
    JS9.error("no saveAs function available for saving image");
    }
    return fname;
};

$(document).ready(function(){
    var flag = false;
    $('#imabutton').click(function(){
        image = JS9.GetImage();
        image.testsave();
    })
});
