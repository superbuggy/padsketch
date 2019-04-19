import React, { Component } from 'react'
import Sampler from './Sequencer/Sampler'
import Tone from 'tone'
import './Padsketch.css'

export default class Padsketch extends Component {
  state = {
    userHasInteracted: false
  }

  christen = () => {
    Tone.context.resume();
    this.setState( ({userHasInteracted}) => ({userHasInteracted: !userHasInteracted}))
  }

  componentDidMount () {
    Tone.transport.loop = true
  }

  render() {
    return (
      <div>
        {
          this.state.userHasInteracted 
          ? <Sampler transport={Tone.Transport} /> 
          : <button className={'start-button'} onClick={this.christen}>▸</button>
        }
      </div>
    )
  }
}
