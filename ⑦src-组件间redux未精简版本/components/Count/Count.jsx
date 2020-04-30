import React, { Component } from 'react'
export default class Add extends Component {
  
  // state = {
  //   count:0
  // }
  increment=() => {
    const {value} = this.refs.num
    this.props.increment(value*1)
  }
  decrement=() => {
    const {value} = this.refs.num
    this.props.decrement(value*1)
  }
  incrementOdd=() => {
    const {value} = this.refs.num
    const {count} = this.props
    if( count%2 === 1){
      this.props.increment(value*1)
    }
  }
  incrementAsync=() => {
    const {value} = this.refs.num
    // setTimeout(() => {
    //   this.props.increment(value*1)
    // }, 500);
    this.props.incrementAsync(value*1,200)
    console.log(this.props.incrementAsync)
  }

  render() {
    // console.log('this.props',this.props)
    return (
      <div>
        <p>获取的总和为：{this.props.count}</p>
        <p>总人数为：{this.props.personTotal}</p>
        <input type="text" placeholder="请输入值" ref="num"/>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementOdd}>increment if odd</button>&nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}
