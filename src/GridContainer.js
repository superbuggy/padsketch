import React, { Component } from 'react'

export default class GridContainer extends Component {
  state = {
    sequenceLength: 20,
  }

  changeSteps = event => {
    event.persist()
    this.setState(_ => ({
      sequenceLength: parseInt(event.target.value, 10)
    }))
  }

  render() {
    // this.props.instruments
    const cells = [1,2,3,4].map(instrument => {
      const steps = Array.from(Array(this.state.sequenceLength))
      const stepsPerInstrument = steps.map(step => (
        <span>
          {'X'}
        </span>
      ))
      return (
        <div>
          { stepsPerInstrument }
        </div>
      )
    })

    const options = Array.from(Array(13))
      .map((_, i) => i + 4)
      .map((amountOfSteps, i) => (
        <option value={amountOfSteps} key={i}>
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
