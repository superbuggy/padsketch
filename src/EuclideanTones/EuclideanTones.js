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
    const polySynth = new Tone.PolySynth(12, Tone.Synth).toMaster()
    this.setState({ polySynth })
  }
  render () {
    return (
      <EuclideanTonesContainer polySynth={this.state.polySynth} />
    )
  }
}

export default EuclideanTones
