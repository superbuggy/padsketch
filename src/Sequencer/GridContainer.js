import React, { Component } from 'react'
import Lane from './Lane'
import SequenceLengthDropdown from './SequenceLengthDropdown'

export default class GridContainer extends Component {
  state = {
    sequenceLength: 16,
  }

  changeSteps = event => {
    event.persist()
    this.setState(_ => ({
      sequenceLength: parseInt(event.target.value, 10)
    }))
  }

  render() {
    const steps = Array.from(Array(this.state.sequenceLength))
    const cells = Object.keys(this.props.instruments).map(instrument => (
      <Lane instrument={instrument} steps={steps} />
    ))



    return (
      <div>
        { cells }
        <SequenceLengthDropdown 
          changeSteps={this.changeSteps} 
          sequenceLength={this.state.sequenceLength} 
        />
      </div>
    )
  }
}
