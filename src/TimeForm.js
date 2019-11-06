import React, { useState } from 'react';
import Chart from 'chart.js';
import './TimeForm.css';

function TimeForm(){
  const [form, setForm] = useState(null);
  
  function updateState(e){
    e.preventDefault();
    let start = e.target.startDate.value;
    let end = e.target.endDate.value;
    let invest = e.target.invest.value;
    let interval = e.target.interval.value;
    
    setForm({start:start, end:end, invest:invest , interval:interval})
      
    getAPIData(start, end, interval, invest);
  }

  function calculateInterval(dailyLogs, interval){
    if(interval === 'weekly'){
      return dailyLogs.filter((log, i) => i % 7 === 0);
    } else if(interval === 'monthly'){
      let startDay = dailyLogs[0][0].charAt(8) + dailyLogs[0][0].charAt(9);
      return dailyLogs.filter(log => {
        return log[0].charAt(8) + log[0].charAt(9) === startDay;
      })
    } else if(interval === 'yearly'){
      let yearlyArray = [];
      return dailyLogs.filter(log => {
        if(!yearlyArray.includes(log[0].charAt(2)+log[0].charAt(3))){
          yearlyArray.push(log[0].charAt(2)+log[0].charAt(3));
          return log;
        }
      })
    } else {
      return dailyLogs;
    }
  }

  function getAPIData(start, end, interval, invest){
    let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`;

    fetch(url)
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
        },
        (error) => {
          console.log(error)
        }
      )
  }

  function calculateGraphArray(arr, invest){
    let data = {date:[], price:[], shares:[], invenstment:[]};

    // populate the date and price from the API
    arr.forEach(log =>  {
      data.date.push(log[0]);
      data.price.push(log[1]);
    })

    // populate the number of shares owned based off of the amounted invested
    let temp = 0;
    data.price.forEach(price => {
      temp += invest/price;
      data.shares.push(temp);
    })
    
    // populates the investment based off of # of shares owned
    data.shares.forEach((share, i) => {
      data.invenstment.push(share*data.price[i]);
    })

    return data;
  }

  function generateChart(obj){
    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
    type: 'line',
    data: {
        labels: obj.date,
        datasets: [{
            label: 'Investment Value',
            data: obj.invenstment,
            backgroundColor: 
                'rgba(255, 99, 132, 0.2)',
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    });
  }

  return(
    <form onSubmit={updateState}>
      <label> A Start Date (earliest start date is: 2013-09-01)
        <input  
          name="startDate"
          placeholder="2013-09-01"
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          required 
        ></input>
      </label>

      <label> An End Date
        <input  
          name="endDate"
          placeholder="2019-11-01"
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          required 
        ></input>
      </label>

      <label> An Amount To Regularily Invest
        <input  
          name="invest"
          placeholder="50"
          pattern="[0-9]{1,6}"
          required 
        ></input>
      </label>

      <label> How Often To Invest
        <select name="interval">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </label>

      <button>SUBMIT</button>
    </form>
  )
}

export default TimeForm;
