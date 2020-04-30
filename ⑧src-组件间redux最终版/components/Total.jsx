import React, { Component } from 'react'
import store from '../redux/store'

export default class Total extends Component {
  
  render() {
    //console.log('store',store.getState())
    const {count,persons} = store.getState()
    // console.log(count,persons)
    return (
      <div>
        <h2>显示与redux打交道的状态</h2>
        <p>总和：{count}</p>
        <p>总人数：{persons.length}</p>
      </div>
    )
  }
}
