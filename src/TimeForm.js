import React, { useState } from 'react';
import './TimeForm.css';
import getAPIData from './getAPIData';
import Summary from './summary';
import calculateTotals from './calculateTotals';
import When from './When';

function TimeForm(){
  const [form, setForm] = useState(null);
  const [data, updateData] = useState({costBasis:0, gain:0, percentageGain:0, totalPrincipal:0});
  const [show, updateShow] = useState(null);

  // console.log('this is my data state', data)
  
  function updateState(e){
    e.preventDefault();
    let start = e.target.startDate.value;
    let end = e.target.endDate.value;
    let invest = e.target.invest.value;
    let interval = e.target.interval.value;

    setForm({start:start, end:end, invest:invest , interval:interval})
    
    getAPIData(start, end, interval, invest)
      .then(dataObj => {
      //   updateData({date:dataObj.date, price:dataObj.price, shares:dataObj.shares, investment:dataObj.investment, principal:dataObj.principal});
        
        let newData = calculateTotals(dataObj);

        // console.log('my newData', newData)
        
        updateData({costBasis:newData.costBasis, gain:newData.gain, percentageGain:newData.percentageGain, totalPrincipal:newData.totalPrincipal});

        // console.log('this is my state of data', data);
        updateShow(true);
        
      })


  }


  return(
    <>
      <form onSubmit={updateState}>
        <label> A Start Date (earliest start date is: 2013-09-01)
          <input  
            name="startDate"
            type="date"
            defaultValue="2018-01-01"
            required>
          </input>
        </label>

        <label> An End Date
        <input  
            name="endDate"
            type="date"
            defaultValue="2019-11-01"
            required>
          </input>
        </label>

        <label> An Amount To Regularly Invest
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

      <When condition={show}>
        <Summary data={data}></Summary>
      </When>
    </>
  )
}

export default TimeForm;
