import React, { Component } from 'react'
import store from '../redux/store'

export default class Gather extends Component {
  render() {
    const {count,phone} = store.getState()
    return (
      <div>
        <h3>汇总</h3>
        <h3>总和：{count}</h3>
        <h3>手机总数：{phone.length}</h3>
      </div>
    )
  }
}
