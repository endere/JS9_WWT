var wwt;

function wwtReady() {
    // wwt.loadImageCollection("images.wtml"); 
}
 

function initialize() {
    wwt = wwtlib.WWTControl.initControl("WWTCanvas");
    wwt.add_ready(wwtReady);
}


function Goto(url) {
    loadExternalImage(null, url, function(result){
        console.log(result);
    })
    wwt.gotoRaDecZoom(15 * 16.5496517733333, -23.25002666, 10, false);
    }


// function setImage(b){
//     // var b = wwt.getImagesetByName(a);
//     wwt.renderContext.set_foregroundImageset(b);
// }

// function getImgWtml(url) {
//     var encodedUrl = 'http://www.worldwidetelescope.org/WWTWeb/TileImage.aspx?imageurl=' + encodeURIComponent(url);
//     $.ajax({
//         url: encodedUrl,
//         crossDomain: true,
//         dataType: 'xml'
//     }).done(wtmlLoaded).fail(ajaxError);
// }

// function wtmlLoaded(xml){
//     var wtml = $(xml);
//     var place = parseWtml(wtml)[0];
//     var imageSet = place.get_studyImageset();
//     // console.log(wtml);
//     console.log(imageSet);
//     console.log(place._name);

// }
// function ajaxError(){
//     console.log('error!');
// }
// setForegroundImageByName:function(a){var b=this.getImagesetByName(a);null!=b&&this.renderContext.set_foregroundImageset(b)}
//getImagesetByName:function(a){for(var b=ss.enumerate(Ec.imageSets);b.moveNext();){var c=b.current;if(c.get_name().toLowerCase().indexOf(a.toLowerCase())>-1)return c}return null},

// set_foregroundImageset:function(a){
//     return this._foregroundImageset=a,a
// }

//---------------------------------------------