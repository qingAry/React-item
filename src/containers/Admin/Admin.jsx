import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Admin extends Component {
  render() {
    //render里面不能编程式跳转 使用Redirect自动跳转到指定的路由组件
    if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
      <div>
        欢迎{this.props.username}登录
      </div>
    )
  }
}

export default connect(
  //映射状态
  state => ({username:state.userInfo.user.username,
             isLogin:state.userInfo.isLogin}),
  //隐射操作对象的方法，不用时默认是空对象
  {})(Admin)
