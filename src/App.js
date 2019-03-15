import React, { Component } from 'react'
import Sampler from './Sampler'
import GridContainer from './GridContainer'

export default class App extends Component {
  render() {
    return (
      <div>
        <Sampler />
        <GridContainer />
      </div>
    )
  }
}
