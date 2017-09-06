'use strict';

let aboutUs = [];

function Us (opts) {
  this.name = opts.name,
  this.about = opts.about,
  this.img = opts.img;
};

Us.prototype.toHtml = function() {
  let source = $('#about-template').html();
  let templateRender = Handlebars.compile(source);
  return templateRender(this);
};

aboutUsData.forEach(function(personObject) {
  aboutUs.push(new Us(personObject));
});

aboutUs.forEach(function(stillUs){
  $('#about').append(stillUs.toHtml());
});
