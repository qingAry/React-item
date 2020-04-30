// 这是容器组件 是Add的ui组件的父组件 专注与redux打交道
import {connect} from 'react-redux' //引入connect 与ui组件建立联系
import {increment,decrement,incrementAsync} from '../redux/actions/count'
import React, { Component } from 'react'

class Count extends Component {
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
// 简写形式
export default connect(
    state => ({count:state.count,personTotal:state.persons.length}), //返回值为对象时候，要用小括号包裹
    {increment,decrement,incrementAsync}
  )(Count)