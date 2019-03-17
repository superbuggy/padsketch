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
      lanes: this.buildLanes(props.instruments, DEFAULT_LENGTH),
      activeStep: NaN
    }
  }

  componentDidMount() {
    this.props.transport.scheduleRepeat(this.tick(), '8n')
  }

  componentDidUpdate (prevProps, { sequenceLength: oldSequenceLength, lanes: oldLanes }) {
    if (oldSequenceLength !== this.state.sequenceLength) {
      const lanes = this.buildLanes(this.props.instruments, this.state.sequenceLength)
      this.setState( _ => ({ lanes }) )
    }
    Object.keys(this.state.lanes).forEach(instrument => {
      if (oldLanes[instrument].pulses !== this.state.lanes[instrument].pulses) {
        this.setState(({ lanes, sequenceLength }) => {
          const { pulses, offset } = lanes[instrument]
          const lane = this.buildLaneState(instrument, sequenceLength, pulses, offset)
          return {
            lanes : {
              ...lanes,
              ...lane
            }
          }
        })
      }
    })
  }

  tick = () => time => {
    const activeStep = (this.state.activeStep + 1) % this.state.sequenceLength || 0
    Object.keys(this.state.lanes).forEach(instrument => {
      if (this.state.lanes[instrument].sequence[activeStep]) {
        this.playSample(instrument)
      }
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

  buildLaneState = (instrument, sequenceLength, pulses, offset) => {
    const sequence = generatePattern(sequenceLength, pulses)
    const offsetSequence = rotate(sequence.slice(), offset)
    return {
      [instrument]: {
        pulses,
        sequence,
        offset,
        offsetSequence
      }
    }
  }
  
  // Build lanes in the sampler for each instrument
  buildLanes = (instruments, length, pulses = 0, offset = 0) => {
    return Object.keys(instruments).reduce((lanes, instrument) => {
      const lane = this.buildLaneState(instrument, length, pulses, offset)
      return {...lanes, ...lane}
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

  changeOffset = (instrument, offset) => {
    this.setState( ({ lanes }) => (
      {
        lanes: {
          ...lanes,
          [instrument]: {
            ...lanes[instrument],
            offsetSequence: rotate(lanes[instrument].sequence, offset),
            offset
          }
        }
      }
    ))
  }

  changeSequence = (instrument, pulses) => {
    this.setState( ({ sequenceLength, lanes }) => {
      const { offset } = lanes[instrument]
      const sequence = rotate(generatePattern(pulses, sequenceLength), offset)
      return {
        lanes: {
          [instrument]: {
            sequence,
            ...lanes[instrument]
          },
          ...lanes
        }
      }
    })
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
