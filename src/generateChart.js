import Chart from 'chart.js';

function generateChart(obj){
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
  type: 'line',
  data: {
      labels: obj.date,
      datasets: [{
          label: 'Investment Value',
          data: obj.investment,
          backgroundColor: 
              'rgba(255, 99, 132, 0.2)',
          borderColor:
              'rgba(255, 99, 132, 1)',
          borderWidth: 1
      },
      {
        label: 'Principal Value',
        data: obj.principal,
        backgroundColor: 
            'rgba(169, 200, 247, 0.2)',
        borderColor:
            'rgba(255, 99, 132, 1)',
        borderWidth: 1
    },
    ]
  },
  });
}

export default generateChart;