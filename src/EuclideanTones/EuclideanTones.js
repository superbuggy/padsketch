import React, { Component } from 'react'
import './EuclideanTones.css'
import EuclideanTonesContainer from './EuclideanTonesContainer'

class EuclideanTones extends Component {

  state= {
    polySynth: null
  }
  componentDidMount () {
    this.initializeSynth()
  }
  
  initializeSynth = () => {
    const { Tone } = this.props 
    const polySynth = new this.props.Tone.PolySynth(12, Tone.Synth).toMaster()
    this.setState({ polySynth })
  }
  render () {
    console.log('this.props.transport', this.props.transport.state)
    return (
      <EuclideanTonesContainer 
        Tone={this.props.Tone}
        transport={this.props.transport}
        polySynth={this.state.polySynth} />
    )
  }
}

export default EuclideanTones
