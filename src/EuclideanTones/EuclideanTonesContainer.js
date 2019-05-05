import React, { Component } from 'react'
import Tone from 'tone'

import { TONES } from './constants'
import { EuclideanToneCircle } from './EuclideanToneCircle'
import { EuclideanTonesControls } from './EuclideanTonesControls'
import { generatePattern, rotate } from './utils-euclidean-tones'


export default class EuclideanTonesContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tones: TONES,
      activeTones: TONES,
      activeCount: TONES.length,
      offset: 2,
      playing: false,
      pattern: null
    }
    this.transport = Tone.Transport
  }

  changeOffset = offset => {
    this.setState(
      _ => ({ offset }),
      this.filterTones
    )
  }

  changeActiveCount = activeCount => {
    this.setState(
      _ => ({ activeCount }),
      this.filterTones
    )
  }

  play = () => {
    this.setState(
      prevState => {
        if (prevState.pattern) prevState.pattern.dispose()
        const tones = prevState.activeTones.map(tone => `${tone}4`)
        const pattern = new Tone.Pattern((time, note) => {
          this.props.polySynth.triggerAttackRelease(note, '2n')
        }, tones)
        pattern.start(0)
        return {
          pattern,
          playing: true
        }
      },
      _ => this.transport.start()
    )
  }

  stop = () => {
    this.setState(prevState => {
      this.transport.stop()
      return {
        playing: false
      }
    })
  }
  
  filterTones = () => {
    this.setState(
      ({tones, offset, activeCount}) => {
        const pattern = rotate(generatePattern(activeCount, tones.length), offset)
        return {
          activeTones: tones.filter((_, index) => pattern[index])
        }
      }, 
      this.state.playing ? this.play : this.stop
    )
  }

  render () {

    return (
      <div className={'tones-container'}>
        <EuclideanToneCircle
          tones={this.state.tones}
          activeTones={this.state.activeTones}
          activeCount={this.state.activeCount}
          playing={this.state.playing}
          play={this.play}
          stop={this.stop}
        />
        <EuclideanTonesControls
          offset={this.state.offset}
          activeCount={this.state.activeCount}
          changeOffset={this.changeOffset}
          changeActiveCount={this.changeActiveCount}
          maxTones={this.state.tones.length}
        />
      </div>
    )
  }
}
