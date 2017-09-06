'use strict';

const meteorView = {};

meteorView.handleDecadeFilter = callback => {
$('#filter-one').on('change', function() {
  if (!isNaN(this.value)){
    $('#filter-two').val('default');
  $.ajax({url: '/meteors/decade', method:'GET', headers: {val: this.value + '-01-01', val2: parseInt(this.value) + 10 + '-01-01'}})
  .then(results => {
    Meteor.loadAll(results)
    callback();
  });
} else {
  meteorView.fetchAll(initMarkers);
}
});

};

meteorView.handleMassFilter = callback =>{
  $('#filter-two').on('change', function(){
      switch(this.value){
        case 'small':
          var valueOne = 0;
          var valueTwo = 1000;
          break;
        case 'medium':
          var valueOne = 1000;
          var valueTwo = 10000;
          break;
        case 'big':
          var valueOne = 10000;
          var valueTwo = 100000;
          break;
        case 'huge':
          var valueOne = 100000;
          var valueTwo = 10000000000;
          break;
        default:
        $('#filter-one').val('default');
          return meteorView.fetchAll(initMarkers);
      };
      $('#filter-one').val('default');
      $.ajax({url: '/meteors/mass', method: 'GET', headers: {val: valueOne, val2: valueTwo}})
      .then(results => {
        Meteor.loadAll(results);
        callback();
      });
  });
};
meteorView.fetchAll = callback => {
  $.get('/meteors')
  .then(
    results => {
      Meteor.loadAll(results);
      callback();
    }
  )
};
meteorView.handleDecadeFilter(initMarkers);
meteorView.handleMassFilter(initMarkers);
