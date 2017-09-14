


JS9.Image.prototype.getExportURL = function(){
    //Edited save file code from JS9
    var key,img, ctx;
    var canvas, width, height;
    width = this.display.width;
    height = this.display.height;
    // create off-screen canvas, into which we write all canvases
    img = document.createElement("canvas");
    img.setAttribute("width", width);
    img.setAttribute("height", height);
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
    var image = new Image();
    image.src = img.toDataURL('image/png')
    return image['src'];
};

$(document).ready(function(){
    $('#imabutton').click(function(){
        image = JS9.GetImage();
        window.open(image.getExportURL());
    })
});
