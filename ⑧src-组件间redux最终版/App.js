import React, { Component } from 'react'
// 使用容器组件的时候 渲染的是容器组件
import Count from './containers/Count'
import Person from './containers/Person'
import Total from './components/Total'


export default class App extends Component {
  render() {
    return (
      <div>
        <Total/>
        <hr/>
        <h3>显示总和</h3>
        <Count/>
        <br/>
        <hr/>
        <br/>
        <h3>显示总人数</h3>
        <Person/>
      </div>
    )
  }
}
