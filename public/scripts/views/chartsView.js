'use strict'

const chartsView = {};
const yearDecades = [1800, 1810, 1820, 1830, 1840, 1850, 1860, 1870, 1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];
const yearEnds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function makeDecades(yearDecades) {
  let decades = yearDecades.map(i => {
    i =
    Meteor.all.map(e => {
      let count = 0;
      if (
      String(e.year).slice(0,4) >= i &&  String(e.year).slice(0,4) < i+10
    ) {count += 1}
      return count;
    })
    return i.reduce(function(acc, val) {
      return acc + val;
    }, 0);
  })
  return decades;
}

chartsView.handleClick = () => {
  $('#chart').on('click', function() {
    if (Meteor.all.length < 3000)
    { let singleDecade = yearEnds.map(i => {
      return String(Meteor.all[0].year).slice(0,3) + i
    });
    createChart(makeDecades(singleDecade),'Meteors by Year', singleDecade);
  }
  else {
  createChart(makeDecades(yearDecades), 'Meteors by Decade', yearDecades);
  }
})
};

var dataLabels = [];

function createChart(dataType, title, labelType){
  $('#shown').replaceWith('<canvas class="chart" id="shown" width="600" height="400"></canvas>');
  let context=$('#shown');
  let labelColors = ['salmon', 'yellow', 'purple'];
  let chartData ={
    type: 'bar',
    data: {
      labels: labelType,
      datasets: [{
        label: title,
        data: dataType,
        backgroundColor: 'grey',
      }],
    },
    options: {
      legend: {labels:{fontColor:'#fff', fontSize: 18}},
      scales: {
        yAxes: [{
          ticks: {
            fontColor:'#fff',
            beginAtZero:true
          }
        }],
        xAxes:[{
          ticks: {
            fontColor:'#fff'
          }
        }]
      }
    }
  };
  var myChart = new Chart(context, chartData);
}
chartsView.handleClick();
