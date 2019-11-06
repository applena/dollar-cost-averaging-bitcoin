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

export default calculateInterval;