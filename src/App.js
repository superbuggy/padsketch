import React, { Component } from 'react'
import Sampler from './Sequencer/Sampler'
import Tone from 'tone'
export default class App extends Component {
  state = {
    userHasInteracted: false
  }

  christen = () => {
    Tone.context.resume();
    this.setState( ({userHasInteracted}) => ({userHasInteracted: !userHasInteracted}))
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
