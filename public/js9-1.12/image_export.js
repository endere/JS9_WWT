


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
    console.log(ctx);
    console.log(img);
    var image = new Image();
    image.src = img.toDataURL('image/png', 1)
    return image['src'];
};
var cat_url = 'https://i.pinimg.com/736x/92/9d/3d/929d3d9f76f406b5ac6020323d2d32dc--pretty-cats-beautiful-cats.jpg';

$(document).ready(function(){
    $('#imabutton').click(function(){
        image = JS9.GetImage();
        flaskRequest(image.getExportURL());
        // Goto(image.getExportURL());
        // $.parseXML('images.wtml');
        // var file = new File([''], 'images.wtml');
        // console.log(file);
        // var reader = new FileReader();
        // console.log(reader.readAsBinaryString(file));
        // window.open(image.getExportURL());
        // window.open(cat_url);

        // wwt.setImage(image.getExportURL());
    })
});

function flaskRequest(attatchment) {
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5000/',
        crossDomain: true,
        processData: false,
        contentType: false,
        data: attatchment
    }).done(success).fail(failed);

}
function success(response){
    console.log('success!!');
}

function failed(response){
    console.log(response);
    console.log('failed');
}