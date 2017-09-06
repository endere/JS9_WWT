'use strict';

var map = {};
var locations = [];
function initMap () {
      //Some of the code syntax used was given by the google maps API website.
      map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.0997, lng: -94.5786},
      zoom: 4,
      mapTypeId: 'roadmap'
    });

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });
    var markers = [];
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  };
  function initMarkers() {
    locations.forEach(e => {
      e.setMap(null)
    });

    var previousMarker = false;
    locations = Meteor.all.map(e => {
    e.reclat = parseFloat(e.reclat);
    e.reclong = parseFloat(e.reclong);
    let newPosition = {lat: e.reclat, lng: e.reclong};
    let marker = new google.maps.Marker({
      position: newPosition,
      icon: 'images/marker31x50.png',
      map: map
    });
    let infowindow = new google.maps.InfoWindow({
      content: `${e.name}, ${e.mass/1000}kg, ` + String(e.year).slice(0, 4)
    });
    google.maps.event.addListener(marker, 'click', function() {
      if(previousMarker){
        previousMarker.close();
      }
      infowindow.open(map, marker);
      previousMarker = infowindow;
    })
    marker.setMap(map);
    return marker;
  })
}
