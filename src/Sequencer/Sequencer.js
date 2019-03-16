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
      lanes: this.buildLanes(props.instruments, DEFAULT_LENGTH)
    }
  }

  componentDidUpdate (prevProps, { sequenceLength, lanes: oldLanes }) {
    if (sequenceLength !== this.state.sequenceLength) {
      const lanes = this.buildLanes(this.state.sequenceLength, this.props.instruments)
      this.setState( _ => ({ lanes }) )
    }
    Object.keys(this.state.lanes).forEach(instrument => {
      if (oldLanes[instrument].pulses !== this.state.lanes[instrument].pulses) {
        this.setState(state => {
          const pulses = state.lanes[instrument].pulses
          const sequence = generatePattern(state.sequenceLength, pulses)
          return {
            lanes: {
              ...state.lanes,
              [instrument]: {
                pulses,
                sequence
              },
            }
          }
        })
      }
    })
  }

  buildLanes = (instruments, length, pulses = 0) => {
    const sequence =  generatePattern(length, pulses)
    console.log(pulses, length, sequence, 'buildLanes')
    return Object.keys(instruments).reduce((nextInstruments, instrument) => {
      nextInstruments[instrument] = {
        sequence,
        pulses
      }
      return nextInstruments
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
