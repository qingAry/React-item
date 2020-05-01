import React, { Component } from 'react'
import Count from './containers/Count'
import Phone from './containers/Phone'
import Gather from './components/Gather'

export default class App extends Component {
  render() {
    return (
      <div>
        <Gather/>
        <br/>
        <hr/>
        <Count/>
        <br/>
        <hr/>
        <Phone/>
      </div>
    )
  }
}
