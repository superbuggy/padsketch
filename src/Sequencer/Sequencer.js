import React, { Component } from 'react'
import { generatePattern, rotate } from './utils'
import Lane from './Lane'
import SequenceLengthDropdown from './SequenceLengthDropdown'

export default class Sequencer extends Component {
  constructor (props) {
    super(props)
    const DEFAULT_LENGTH = 16
    this.state = {
      sequenceLength: DEFAULT_LENGTH,
      sequences: this.buildSequences(DEFAULT_LENGTH)
    }
  }

  buildSequences = (length) => {
    return Object.keys(this.props.instruments).reduce((instruments, instrument) => {
      instruments[instrument] = Array.from({ length }).fill(false)
      return instruments
    }, {})
  }

  changeSequenceLength = sequenceLength => {
    this.setState( _ => ({ sequenceLength }) )
  }

  componentDidUpdate (prevProps, { sequenceLength }) {
    if (sequenceLength !== this.state.sequenceLength) {
      const sequences = this.buildSequences(this.state.sequenceLength)
      this.setState(_ => ({ sequences }))
    }
  }

  render() {

    return (
      <div>
        { 
          Object.keys(this.state.sequences).map(instrument => (
            <Lane 
              instrument={instrument}
              key={instrument}
              steps={this.state.sequences[instrument]}
            />
          )) 
        }
        <SequenceLengthDropdown 
          changeSequenceLength={this.changeSequenceLength} 
          sequenceLength={this.state.sequenceLength} 
        />
      </div>
    )
  }
}
