function calculateGraphArray(arr, invest){
  let data = {date:[], price:[], shares:[], investment:[], principal:[]};

  // populate the date and price from the API
  let temp=0;
  arr.forEach(log =>  {
    temp += Number(invest);
    data.date.push(log[0]);
    data.price.push(log[1]);
    data.principal.push(temp);
  })
  console.log(data.principal);
  // populate the number of shares owned based off of the amounted invested
  temp = 0;
  data.price.forEach(price => {
    temp += invest/price;
    data.shares.push(temp);
  })
  
  // populates the investment based off of # of shares owned
  data.shares.forEach((share, i) => {
    data.investment.push(share*data.price[i]);
  })

  return data;
}

export default calculateGraphArray;