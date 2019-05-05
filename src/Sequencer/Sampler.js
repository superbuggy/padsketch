import React, { Component } from 'react'

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
    prevState.isPlaying !== this.state.isPlaying && this.state.isPlaying 
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
    const sampler = new this.props.Tone.Players(
      this.sampleMap,
      () => console.log(sampler)
    )//.sync()
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
    this.setState( ({ isPlaying }) => ({isPlaying: !isPlaying}))
  }
  
  triggerKick = () => {
    this.state.sampler.get('C3').start()
    // this.state.sampler.get('C#3').start()
  }
  
  triggerSnare = () => {
    this.state.sampler.get('D3').start()
    // this.state.sampler.get('D#3').start()
    // this.state.sampler.get('E3').start()
    // this.state.sampler.get('F3').start()
  }
  
  triggerClosedHats = () => {
      this.state.sampler.get('F#3').start()
      this.state.sampler.get('G3').stop()
  }
  
  triggerOpenHats = () => {
    this.state.sampler.get('G3').start()
  }

  triggerRide = () => {
    this.state.sampler.get('G#3').start()
    // this.state.sampler.get('A3').start()
    // this.state.sampler.get('A#3').start()
    // this.state.sampler.get('B3').start()
  }

  render () {
    const { isPlaying } = this.state
    return (
      <div className={'sampler'}>
        <Sequencer
          transport={this.props.transport}
          isPlaying={isPlaying}
          instruments={this.instruments}
          togglePlaying={this.togglePlaying}
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
