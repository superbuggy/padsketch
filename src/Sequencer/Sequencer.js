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
      lanes: this.initializedLanes(DEFAULT_LENGTH).lanes,
      activeStep: NaN
    }
  }

  initializedLanes = length => {
    const pulsesList = Array.from({length}).fill(0)
    const offsets = Array.from({length}).fill(0)
    return this.buildLanes(length, pulsesList, offsets)
  }
  
  buildLanes = (length, pulsesList, offsets, lanes = {}) => {
    const instrumentNames = Object.keys(this.props.instruments)
    const builtLanes = instrumentNames.reduce((newLanes, instrument, index) => {
      const [ pulses, offset ] = [ pulsesList[index], offsets[index] ]
      const lane = this.buildLaneState(instrument, length, pulses, offset)
      return {...newLanes, ...lane}
    }, lanes)
    return {
      lanes: builtLanes
    }
  }

  generateSequences = (length, pulses, offset) => {
    offset = offset > length ? length : offset
    pulses = pulses > length ? length : pulses
    const sequence = generatePattern(length, pulses)
    const offsetSequence = rotate(sequence.slice(), offset)
    return { sequence, offsetSequence }
  }
  
  buildLaneState = (instrument, length, pulses, offset) => {
    const { sequence, offsetSequence } = this.generateSequences(length, pulses, offset)
    return {
      [instrument]: {
        pulses,
        sequence,
        offset,
        offsetSequence
      }
    }
  }

  componentDidMount () {
    this.props.transport.scheduleRepeat(this.tick(), '8n')
  }

  tick = () => time => {
    const activeStep = (this.state.activeStep + 1) % this.state.sequenceLength || 0
    console.log(activeStep)
    Object.keys(this.state.lanes).forEach(instrument => {
      console.log('this.state.lanes[instrument].sequence', this.state.lanes[instrument].sequence)
      this.state.lanes[instrument].offsetSequence[activeStep] && this.playSample(instrument)
    })
    this.setState( ( _ => ({ activeStep }) ) )
  }

  playSample = instrument => {
    switch (instrument) {
      case 'Kick':
        return this.props.triggerKick()
      case 'Snare':
        return this.props.triggerSnare()
      case 'Closed Hats':
        return this.props.triggerClosedHats()
      case 'Open Hats':
        return this.props.triggerOpenHats()
      case 'Ride':
        return this.props.triggerRide()
      default:
        return
    }
  }

  changeSequenceLength = sequenceLength => {
    this.setState( ({ lanes }) => ({
        sequenceLength,
        lanes: Object.keys(lanes).reduce((newLanes, instrument) => {
          const { pulses, offset } = lanes[instrument]
          return {
            ...newLanes,
            ...this.buildLaneState(instrument, sequenceLength, pulses, offset)
          }
        }, {})
      })
    )
  }

  changePulses = (instrument, pulses) => {
    this.setState( ({ lanes, sequenceLength }) => {
      const { offset } = lanes[instrument]
      const lane = this.buildLaneState(instrument, sequenceLength, pulses, offset)
      return {
        lanes: {
          ...lanes,
          ...lane
        }
      }
    })
  }
  
  changeOffset = (instrument, offset) => {
    this.setState( ({ lanes, sequenceLength }) => {
      const { pulses } = lanes[instrument]
      const lane = this.buildLaneState(instrument, sequenceLength, pulses, offset)
      return {
        lanes: {
          ...lanes,
          ...lane
        }
      }
    })
  }
  
  // toggleStep = (instrument, step) => {
  //   this.setState( ({ lanes }) => {
  //     const { sequenceLength, pulses, offset } = lanes[instrument]
  //     const newLanes = this.buildLanes(sequenceLength, pulses, offset, lanes)
  //     newLanes[instrument].sequence[step] = !newLanes[instrument].sequence[step]
  //     return newLanes
  //   } )
  // }

  render() {
    console.log(this.state)
    return (
      <div className={'sequencer'}>
        <section className={'lanes'}>
        { 
          Object.keys(this.state.lanes).map( (instrument, index) => (
            <Lane 
              instrument={instrument}
              key={index}
              sequence={this.state.lanes[instrument].offsetSequence}
              pulses={this.state.lanes[instrument].pulses}
              offset={this.state.lanes[instrument].offset}
              activeStep={this.state.activeStep}
              changePulses={this.changePulses}
              changeOffset={this.changeOffset}
            />
          )) 
        }
        </section>
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
