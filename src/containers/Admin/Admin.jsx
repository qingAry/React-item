import React, { Component } from 'react'
import {connect} from 'react-redux'

class Admin extends Component {
  render() {
    return (
      <div>
        欢迎{this.props.username}登录
      </div>
    )
  }
}

export default connect(
  //映射状态
  state => ({username:state.userInfo.user.username}),
  //隐射操作对象的方法，不用时默认是空对象
  {})(Admin)
