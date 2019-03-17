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

  tick = () => time => {
    const activeStep = (this.state.activeStep + 1) % this.state.sequenceLength || 0
    Object.keys(this.state.lanes).forEach(instrument => {
      if (this.state.lanes[instrument].sequence[activeStep]) {
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
    })
    this.setState( ( _ => ({ activeStep }) ) )
  }

  // Build a lane in the sampler for every instrument
  buildLanes = (instruments, length, pulses = 0) => {
    const sequence =  generatePattern(length, pulses)
    return Object.keys(instruments).reduce((lanes, instrument) => {
      lanes[instrument] = {
        sequence,
        pulses
      }
      return lanes
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
      <div className={'sequencer'}>
        <section className={'lanes'}>
        { 
          Object.keys(this.state.lanes).map( (instrument, index) => (
            <Lane 
              instrument={instrument}
              key={index}
              steps={this.state.lanes[instrument].sequence}
              pulses={this.state.lanes[instrument].pulses}
              activeStep={this.state.activeStep}
              changePulses={this.changePulses}
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
