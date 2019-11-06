import React from 'react';
import './App.css';
import TimeForm from './TimeForm';
import Chart from './Chart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Dollar Cost Avergering Investing in Bitcoin</h1>
      </header>
      <TimeForm></TimeForm>
      <Chart></Chart>
    </div>
  );
}

export default App;
