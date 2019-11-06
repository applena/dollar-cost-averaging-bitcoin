import React, { useState } from 'react';
import './TimeForm.css';
import getAPIData from './getAPIData';

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
  )
}

export default TimeForm;
