import React, { Component } from 'react'
import store from '../../redux/store'

export default class Add extends Component {
  
  // state = {
  //   count:0
  // }
  increment=() => {
    const {value} = this.refs.num
    // 调用store中的api dispatch并传入怎么做和条件的对象
    // 触发redux中数据的改变 返回新的数据状态
    store.dispatch({type:"increment",data:value*1})
  }
  decrement=() => {
    const {value} = this.refs.num
    store.dispatch({type:"decrement",data:value*1})
  }
  incrementOdd=() => {
    const {value} = this.refs.num
    if(store.getState()%2 === 1){
      store.dispatch({type:"increment",data:value*1})
    }
  }
  incrementAsync=() => {
    const {value} = this.refs.num
    setTimeout(() => {
      store.dispatch({type:"increment",data:value*1})
    }, 500);
  }

  render() {
    return (
      <div>
        <p>获取的总和为：{store.getState()}</p>
        <input type="text" placeholder="请输入值" ref="num"/>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementOdd}>increment if odd</button>
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}
