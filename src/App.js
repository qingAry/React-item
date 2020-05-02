import React, { Component } from 'react'
import Count from './containers/Count'
import Phone from './containers/Phone'

export default class App extends Component {
  render() {
    return (
      <div>
        <Count/>
        <hr/>
        <br/>
        <Phone/>
      </div>
    )
  }
}
