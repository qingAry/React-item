// 引入ui组件
// import Count from '../components/Count/Count'
// 引入与ui组件能够搭建联系的connect
import {connect} from 'react-redux'
//引入action
import {increment,decrement} from '../redux/actions/count'

//引入ui组件核心库
import React, { Component } from 'react'
//Count ui组件
class Count extends Component {
  
  // 加法
  increment = () =>{
    // console.log(this.num.value)
    const {value} = this.num
    this.props.increment(value*1)
  }
  // 减法
  decrement = () =>{
    // console.log(this.num.value)
    const {value} = this.num
    this.props.decrement(value*1)
  }
  //奇数加
  incrementOdd = () =>{
    // console.log(this.num.value)
    const {value} = this.num
    if( this.props.count % 2 === 1){
      this.props.increment(value*1)
    }
    
  }
  //定时器
  incrementAsync = () => {
    const {value} = this.num
    setTimeout(() => {
      this.props.increment(value*1)
    }, 300);
  }
  render() {
    // console.log(this.props)
    return (
      <div>
        <h3>获取总和为：{this.props.count},购买的手机总数为：{this.props.phoneNum}</h3>
        <input type="text" ref={(currentNode)=>{this.num = currentNode}}/>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementOdd}>odd</button>&nbsp;
        <button onClick={this.incrementAsync}>async</button>&nbsp;
      </div>
    )
  }
}

//返回一个容器组件
export default connect(state => ({count:state.count,phoneNum:state.phone.length}),{increment,decrement})(Count)