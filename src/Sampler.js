import React, { Component } from 'react'
import Tone from 'tone'

export default class Sampler extends Component {
  state = {
      sampler: null,
  }

  transport = Tone.Transport

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
    ).sync()
    sampler.toMaster()
    this.setState( _ => ({ sampler }) )
  }

  startTransport = () => {
    this.transport.start()
  }
  
  triggerKick = (samples) => {
    this.state.sampler.triggerAttack('C3')
    // this.state.sampler.triggerAttack('C#3')
  }

  triggerSnare = (samples) => {
    this.state.sampler.triggerAttack('D3')
    // this.state.sampler.triggerAttack('D#3')
    // this.state.sampler.triggerAttack('E3')
    // this.state.sampler.triggerAttack('F3')
  }
  
  triggerClosedHats = (samples) => {
    this.state.sampler.triggerAttack('F#3')
  }
  
  triggerOpenHats = (samples) => {
    this.state.sampler.triggerAttack('G3')
  }

  triggerRide = (samples) => {
    this.state.sampler.triggerAttack('G#3')
    // this.state.sampler.triggerAttack('A3')
    // this.state.sampler.triggerAttack('A#3')
    // this.state.sampler.triggerAttack('B3')
  }

  render () {
    return (
      <div>
        <button onClick={this.startTransport}> Start </button>
        <button onClick={this.triggerKick}> Kick </button>
        <button onClick={this.triggerSnare}> Snare </button>
        <button onClick={this.triggerClosedHats}> Open Hat </button>
        <button onClick={this.triggerOpenHats}> Closed Hat </button>
        <button onClick={this.triggerRide}> Ride </button>
      </div>
    )
  }
}
