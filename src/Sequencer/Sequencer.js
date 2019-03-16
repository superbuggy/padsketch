import React, { Component } from 'react'
import { generatePattern, rotate } from './utils'
import Lane from './Lane'
import RangeSlider from './RangeSlider'

export default class Sequencer extends Component {
  constructor (props) {
    super(props)
    const DEFAULT_LENGTH = 16
    this.state = {
      sequenceLength: DEFAULT_LENGTH,
      lanes: this.buildSequences(DEFAULT_LENGTH)
    }
  }

  componentDidUpdate (prevProps, { sequenceLength }) {
    if (sequenceLength !== this.state.sequenceLength) {
      const lanes = this.buildSequences(this.state.sequenceLength)
      this.setState(_ => ({ lanes }))
    }
  }

  buildSequences = length => {
    return Object.keys(this.props.instruments).reduce((instruments, instrument) => {
      instruments[instrument] = {
        sequence: Array.from({ length }).fill(false),
        pulses: 0
      }
      return instruments
    }, {})
  }

  changeSequenceLength = sequenceLength => {
    this.setState( _ => ({ sequenceLength }) )
  }

  changePulses = (instrument, pulses) => {
    this.setState( ({ lanes }) => (
      {
        lanes: {
          ...lanes,
          [instrument]: {
            ...lanes[instrument],
            pulses
          }
        }
      }
    ))
  }

  changeSequence = (instrument, pulses) => {
    this.setState( ({ sequenceLength, lanes }) =>({
      lanes: {
        [instrument]: {
          sequence: generatePattern(pulses, sequenceLength),
          ...lanes[instrument]
        },
        ...lanes
      }
    }))
  }

  toggleStep = (instrument, step) => {
    this.setState( ({ lanes }) => ({
      lanes: {
        ...lanes,
        [instrument]: {
          ...lanes[instrument], //pulses  
          sequence: [step] = !lanes[instrument].sequence[step]
        }
      }
    }) )
  }

  render() {

    return (
      <div>
        { 
          Object.keys(this.state.lanes).map( (instrument, index) => (
            <Lane 
              instrument={instrument}
              key={index}
              steps={this.state.lanes[instrument].sequence}
              pulses={this.state.lanes[instrument].pulses}
              changePulses={this.changePulses}
            />
          )) 
        }
        <RangeSlider
          min={4} 
          max={32} 
          handleChange={this.changeSequenceLength} 
          value={this.state.sequenceLength} 
          label={'Length'}
        />
      </div>
    )
  }
}
