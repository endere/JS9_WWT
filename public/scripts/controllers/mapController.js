'use strict';

(function(module) {
  const mapController = {};

  mapController.init = () => {
    meteorView.fetchAll(initMarkers);
    $('#about-page').hide();
    $('#map-filters').fadeIn('fast');
  };

  module.mapController = mapController;
})(window);
