import React, { Component } from 'react'
import Tone from 'tone'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sampler: null
    }
  }

  componentDidMount () {
    const sampleMap = {
      'C3': '/samples/01kick.wav',
      'C#3': '/samples/02 kick2.wav',
      'D3' : '/samples/04 snare1.wav',
      'D#3' : '/samples/05 snare2.wav',
      'E3' : '/samples/06 snare3.wav',
      'F3' : '/samples/07 snare4.wav',
      'F#3' : '/samples/08 hihatclosed.wav',
      'G3' : '/samples/09 hihatwayopen.wav',
      'G#3' : '/samples/10 rideping1.wav',
      'A3' : '/samples/11 rideping2.wav',
      'A#3' : '/samples/12 rideping3.wav',
      'B3' : '/samples/13 rideping4.wav',
    }

    const sampler = new Tone.Sampler(
      sampleMap,
      this.triggerSample
    ).toMaster()

    this.setState( _ => ({ sampler }) )
  }
  
  triggerSample = (samples) => {
    this.state.sampler.triggerAttack('C3')
    this.state.sampler.triggerAttack('C#3')
  }

  render () {
    return (
      <div>
        <button onClick={this.triggerSample}> Start </button>
      </div>
    )
  }
}
