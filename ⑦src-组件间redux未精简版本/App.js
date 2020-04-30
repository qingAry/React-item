import React, { Component } from 'react'
// 使用容器组件的时候 渲染的是容器组件
import Count from './containers/Count'
import Person from './containers/Person'


export default class App extends Component {
  render() {
    return (
      <div>
      <Count/>
      <br/>
      <hr/>
      <br/>
      <Person/>
      </div>
    )
  }
}
