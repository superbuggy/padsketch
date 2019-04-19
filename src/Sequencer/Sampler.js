import React, { Component } from 'react'
import Tone from 'tone'

import Sequencer from './Sequencer'
export default class Sampler extends Component {
  state = {
      sampler: null,
      isPlaying: false
  }

  instruments = {
    'Kick': ['C3', 'C#3'],
    'Snare': ['D3', 'D#3', 'E3', 'F3'],
    'Closed Hats': ['F#3'],
    'Open Hats': ['G3'],
    'Ride': ['G#3', 'A3' , 'A#3', 'B3']
  }

  componentDidUpdate (prevProps, prevState) {
    prevState.isPlaying !== this.state.isPlaying 
    && this.state.isPlaying 
        ? this.startTransport()
        : this.stopTransport()
    
  }

  sampleMap = {
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

  componentDidMount () {
    window.addEventListener('keydown', event => {
      if (event.key === ' ') {
        this.togglePlaying()
      }
    })
    const sampler = new Tone.Sampler(
      this.sampleMap,
      () => console.log('sampler loaded callback')
    ).sync()
    sampler.toMaster()
    this.setState( _ => ({ sampler }) )
  }

  startTransport = () => {
    this.props.transport.start()
  }

  stopTransport = () => {
    this.props.transport.stop()
  }

  togglePlaying = () => {
    this.setState( ({isPlaying}) => ({isPlaying: !isPlaying}))
  }
  
  triggerKick = (samples) => {
    this.state.sampler.triggerAttack('C3')
    // this.state.sampler.triggerAttack('C#3')
  }

  triggerSnare = () => {
    this.state.sampler.triggerAttack('D3')
    // this.state.sampler.triggerAttack('D#3')
    // this.state.sampler.triggerAttack('E3')
    // this.state.sampler.triggerAttack('F3')
  }
  
  triggerClosedHats = () => {
    this.state.sampler.triggerAttack('F#3')
  }
  
  triggerOpenHats = () => {
    this.state.sampler.triggerAttack('G3')
  }

  triggerRide = () => {
    this.state.sampler.triggerAttack('G#3')
    // this.state.sampler.triggerAttack('A3')
    // this.state.sampler.triggerAttack('A#3')
    // this.state.sampler.triggerAttack('B3')
  }

  render () {
    const { isPlaying } = this.state
    return (
      <div className='sampler'>
        <button onClick={this.togglePlaying}> {isPlaying ? 'Stop' : 'Start'} </button>
        <Sequencer
          transport={this.props.transport}
          isPlaying={this.state.isPlaying}
          instruments={this.instruments}
          triggerKick={this.triggerKick}
          triggerSnare={this.triggerSnare}
          triggerClosedHats={this.triggerClosedHats}
          triggerOpenHats={this.triggerOpenHats}
          triggerRide={this.triggerRide}
        />
      </div>
    )
  }
}
