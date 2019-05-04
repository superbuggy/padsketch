import React, { Component } from 'react'
import './EuclideanTones.css'
import TonesContainer from './TonesContainer'
import Tone from 'tone'

class EuclideanTones extends Component {
  render () {
    const polySynth = new Tone.PolySynth(12, Tone.Synth).toMaster()
    return (
      <TonesContainer polySynth={polySynth} />
    )
  }
}

export default EuclideanTones
