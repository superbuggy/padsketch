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
    const component = this
    Tone.Transport.start(0)
    // Tone.Transport.start()
    const sampler = new Tone.Sampler(
      {
        'C3': '/samples/01kick.wav',
        'C#3': '/samples/02 kick2.wav'
      },
      function (samples) {
        console.log('oh damn', samples, component)
        // sampler.triggerAttack('C3')
        component.setState(
          _ => ({ sampler }),
          function () {
            this.state.sampler.triggerAttack('C3')
            console.log(this.state)
          }
        )
      }// .bind(this)
    )
  }

  componentDidUpdate () {
    console.log(this.state)
  }

  render () {
    return (
      <div>
        {''}
      </div>
    )
  }
}
