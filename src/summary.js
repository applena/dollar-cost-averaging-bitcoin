import React from 'react';

class summary extends React.Component{

  render(){
    return(
      <div id="summary">
        <p>Total Principal Invested: {this.props.data.totalPrincipal}</p>
        <p>Cost Basis: {this.props.data.costBasis}</p>
        <p>Total Gain: {this.props.data.gain}</p>
        <p>Percentage Gain: {this.props.data.percentageGain}</p>
      </div>
    )
  }
}

export default summary;