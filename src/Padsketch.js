import React, { Component } from 'react'
import Sampler from './Sequencer/Sampler'
import Tone from 'tone'
import './Padsketch.css'
import EuclideanTones from './EuclideanTones/EuclideanTones'

export default class Padsketch extends Component {
  state = {
    userHasInteracted: false
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.christen)

  }
  
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.christen)
  }



  christen = () => {
    Tone.context.resume();  
    this.state.userHasInteracted && this.setState( ({ userHasInteracted }) => ({ userHasInteracted: true }) )
  }

  render() {
    return (
      <div>
        <Sampler transport={Tone.Transport} Tone={Tone}/>
        <EuclideanTones transport={Tone.Transport} Tone={Tone} />
      </div>
    ) 
  }
}
