var wwt;

function wwtReady() {
    wwt.loadImageCollection("images.wtml"); 
}
 

 function initialize() {
     wwt = wwtlib.WWTControl.initControl("WWTCanvas");
     wwt.add_ready(wwtReady);
 }



function Goto() {
    wwt.setForegroundImageByName('stored image');
    // Change decimal hours to decimal degrees by multiplying by 15
    wwt.gotoRaDecZoom(15 * 16.5496517733333, -23.25002666, 10, false);
    }

     