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

export default calculateGraphArray;