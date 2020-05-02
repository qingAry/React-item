/* 
 这是一个Count容器组件  此时Count组件是ui组件
 */
// import Count from '../components/Count'
import {connect} from 'react-redux'
// 引入action
import {increment,decrement,incrementAsync} from '../redux/actions/count'
// ui组件
import React, { Component } from 'react'
/* ui组件-start */
class Count extends Component {
  increment = () => {
   const {value} = this.refs.num
   this.props.increment(value*1)
  }
  decrement = () => {
   const {value} = this.refs.num
   this.props.decrement(value*1)
  }
  incrementOdd = () => {
   const {value} = this.refs.num
   if( this.props.count % 2 === 1){
    this.props.increment(value*1)
   }
  }
  incrementAsync = () => {
   const {value} = this.refs.num
  //  setTimeout(() => {
  //   this.props.increment(value*1)
  //  }, 500);
  this.props.incrementAsync(value*1,300)
  }
  render() {
    // console.log(this.props)
    return (
      <div>
        <h3>计算总和为：{this.props.count},购买的手机个数为：{this.props.phoneNum}</h3>
        <input type="text" ref="num"/>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementOdd}>increment of odd</button>&nbsp; 
        <button onClick={this.incrementAsync}>decrement of async</button>
      </div>
    )
  }
}
/* ui-end */

//暴露容器组件
export default connect(state =>({count:state.count,phoneNum:state.phone.length}),{increment,decrement,incrementAsync})(Count)