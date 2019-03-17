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
      lanes: this.initializedLanes(props.instruments, DEFAULT_LENGTH),
      activeStep: NaN
    }
  }

  componentDidMount() {
    this.props.transport.scheduleRepeat(this.tick(), '8n')
  }

  shouldComponentUpdate (prevProps, prevState) {
    return Object
      .keys(this.state.lanes)
      .some(instrument => this.didLaneChange(instrument,prevState, this.state))
  }

  didLaneChange = (instrument, prevState, state) => {
    return Boolean(
      prevState.lanes[instrument].pulses !== state.lanes[instrument].pulses
      || prevState.lanes[instrument].offset !== state.lanes[instrument].offset
      || prevState.sequenceLength !== state.sequenceLength
    )
  }

  componentDidUpdate (prevProps, prevState) {
    Object.keys(this.state.lanes).forEach(instrument => {
      this.setState(({ lanes, sequenceLength }) => {
        let { pulses, offset } = lanes[instrument]
        pulses = pulses > sequenceLength ? sequenceLength : pulses
        return this.updateLanes(lanes, instrument, sequenceLength, pulses, offset)
      })
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
  
  // Build lanes in the sampler for each instrument
  buildLanes = (instruments, length, pulses, offset, lanes = {}) => {
    return Object.keys(instruments).reduce((lanes, instrument) => {
      const lane = this.buildLaneState(instrument, length, pulses, offset)
      return {...lanes, ...lane}
    }, lanes)
  }

  buildLaneState = (instrument, length, pulses, offset) => {
    const sequence = generatePattern(length, pulses)
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

  initializedLanes = (instruments, length) => {
    return this.buildLanes(instruments, length, 0, 0, {})
  }

  updateLanes = (lanes, instrument, sequenceLength, pulses, offset) => {
    const lane = this.buildLaneState(instrument, sequenceLength, pulses, offset)
    return {
      lanes: {
        ...lanes,
        ...lane
      }
    }
  }


  changeSequenceLength = sequenceLength => {
    this.setState( _ => ({ sequenceLength }) )
  }

  changePulses = (instrument, pulses) => {
    this.setState( ({ lanes, sequenceLength }) => {
      const { offset } = lanes[instrument]
      return this.updateLanes(lanes, instrument, sequenceLength, pulses, offset)
    })
  }
  
  changeOffset = (instrument, offset) => {
    this.setState( ({ lanes, sequenceLength }) => {
      const { pulses } = lanes[instrument]
      return this.updateLanes(lanes, instrument, sequenceLength, pulses, offset)
    })
  }
  
  toggleStep = (instrument, step) => {
    this.setState( ({ lanes }) => {
      const { sequenceLength, pulses, offset } = lanes[instrument]
      const newLanes = this.updateLanes(lanes, instrument, sequenceLength, pulses, offset)
      newLanes[instrument].sequence[step] = !newLanes[instrument].sequence[step]
      return newLanes
    } )
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
