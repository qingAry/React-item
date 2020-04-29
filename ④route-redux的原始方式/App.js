import React, { Component } from 'react'
// 使用容器组件的时候 渲染的是容器组件
import Add from './containers/Add'


export default class App extends Component {
  render() {
    return (
      <div>
      <Add/>
      </div>
    )
  }
}
