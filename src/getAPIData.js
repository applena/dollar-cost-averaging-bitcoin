import generateChart from './generateChart';
import calculateInterval from './calculateInterval';
import calculateGraphArray from './calculateGraphArray.js';

function getAPIData(start, end, interval, invest){
  let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`;

  return fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        // breaks the results into an array of arrays [['2019-11-02', 89.20], ['2010-11-03', 89.30]...]
        let dailyLogs = Object.entries(result.bpi);

        // reduces the array based on the time period the user entered
        let logs = calculateInterval(dailyLogs, interval);

        // shapes the data into an object {date:['2018-11-01'..], price:[22...], shares:[1, 2, 3...]}
        let graphArray = calculateGraphArray(logs, invest);
        
        generateChart(graphArray);
        return graphArray;
      },
      (error) => {
        console.log(error)
      }
    )
}

export default getAPIData;