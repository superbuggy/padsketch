import React, { Component } from 'react'

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
    const instrumentRows = [1,2,3,4]// this.props.instruments
    const cells = instrumentRows.map(instrument => {
      const steps = Array.from(Array(this.state.sequenceLength))
      const stepsPerInstrument = steps.map(step => (
        <div
          key={step}
          className="step"
        />

      ))
      return (
        <div className="instrument-lane">
          { stepsPerInstrument }
        </div>
      )
    })

    const options = Array.from(Array(13))
      .map((_, i) => i + 4)
      .map((amountOfSteps, i) => (
        <option 
          value={amountOfSteps} 
          key={i} 
          selected={this.state.sequenceLength===amountOfSteps}>
          { amountOfSteps }
        </option>
      ))
    return (
      <div>
        { cells }
        <label>
          steps
          <select onChange={this.changeSteps}>
            { options }
          </select>
        </label>
      </div>
    )
  }
}
