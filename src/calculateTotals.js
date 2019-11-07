function calculateTotals(data){
  console.log(data);
  let totalPrincipal = data.principal[data.principal.length-1];
  let costBasis = Number(data.principal[data.principal.length-1])/Number(data.shares[data.shares.length-1]); 
  let gain = Number(data.investment[data.investment.length-1]) - Number(data.principal[data.principal.length-1]);
  let percentageGain = (Number((data.investment[data.investment.length-1])*100)/Number(data.principal[data.principal.length-1]));

  return {totalPrincipal:totalPrincipal.toFixed(2), costBasis:costBasis.toFixed(2), gain:gain.toFixed(2), percentageGain:percentageGain.toFixed(2)};
}

export default calculateTotals;