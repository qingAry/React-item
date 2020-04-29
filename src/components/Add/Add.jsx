import React, { Component } from 'react'

export default class Add extends Component {
  
  state = {
    count:0
  }
  increment=() => {
    const {value} = this.refs.num
    let {count} = this.state
    count += value*1
    this.setState({count})
  }
  decrement=() => {
    const {value} = this.refs.num
    let {count} = this.state
    count -= value*1
    this.setState({count})
  }
  incrementOdd=() => {
    const {value} = this.refs.num
    let {count} = this.state
    if(count%2 === 1){
      count += value*1
      this.setState({count})
    }
  }
  incrementAsync=() => {
    const {value} = this.refs.num
    let {count} = this.state
    count += value*1
    setTimeout(() => {
      console.log('object')
      this.setState({count})
    }, 500);
  }

  render() {
    return (
      <div>
        <p>获取的总和为：{this.state.count}</p>
        <input type="text" placeholder="请输入值" ref="num"/>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementOdd}>increment if odd</button>
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}
